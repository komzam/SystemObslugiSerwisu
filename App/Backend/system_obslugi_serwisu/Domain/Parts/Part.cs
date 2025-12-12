using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Domain.Parts.Events;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts;

public record PartId(Guid Value);
public class Part : AggregateRoot
{
    public const int PartNameMaxLength = 200;
    public const int ManufacturerCodeMaxLength = 200;
    
    public PartId Id { get; private set; }
    public string Name { get; private set; }
    public string ManufacturerCode { get; private set; }
    public bool NeedsReorder { get; private set; }
    public PartCategoryId CategoryId { get; private set; }
    public decimal Price { get; private set; }
    public int Stock { get; private set; }
    public int Reserved { get; private set; }
    public int Available => Stock - Reserved;
    public StockLevel StockLevel => GetStockLevel();
    public int LowStockThreshold  { get; private set; }
    public IReadOnlyCollection<PartReservation> Reservations => _reservations.AsReadOnly();
    private readonly List<PartReservation> _reservations = new();

    private Part() { }

    private Part(string name, string manufacturerCode, PartCategoryId categoryId, decimal price, int initialStock, int lowStockThreshold)
    {
        Id = new PartId(Guid.NewGuid());
        Name = name;
        ManufacturerCode = manufacturerCode;
        NeedsReorder = false;
        CategoryId = categoryId;
        Price = price;
        Stock = initialStock;
        LowStockThreshold = lowStockThreshold;
    }

    private static OperationResult ValidateInput(string name, string manufacturerCode, decimal price, int initialStock, int lowStockThreshold)
    {
        if (String.IsNullOrWhiteSpace(name))
            return PartErrors.InvalidName();

        if (name.Length > PartNameMaxLength)
            return PartErrors.NameTooLong();
        
        if (String.IsNullOrWhiteSpace(manufacturerCode))
            return PartErrors.InvalidManufacturerCode();

        if (name.Length > ManufacturerCodeMaxLength)
            return PartErrors.ManufacturerCodeTooLong();

        if (price < 0)
            return PartErrors.InvalidPrice();
        
        if (initialStock < 0)
            return PartErrors.InvalidStock();
        
        if (lowStockThreshold < 0)
            return PartErrors.InvalidLowStockThreshold();

        return OperationResult.Success();
    }

    public static OperationResult<Part> Create(string name, string manufacturerCode, PartCategoryId categoryId, decimal price, int initialStock, int lowStockThreshold)
    {
        name = name.Trim();
        var validateResult = ValidateInput(name, manufacturerCode, price, initialStock, lowStockThreshold);
        if(validateResult.IsFailure)
            return validateResult.Error;
        
        return new Part(name, manufacturerCode, categoryId, price, initialStock, lowStockThreshold);
    }

    private StockLevel GetStockLevel()
    {
        if (Stock == 0) return StockLevel.OutOfStock;
        if (Stock <= LowStockThreshold) return StockLevel.Low;
        return StockLevel.Normal;
    }

    public int DefaultOrderQuantity()
    {
        if (StockLevel == StockLevel.Normal)
            return 1;
        
        return LowStockThreshold + 1 - Stock;
    }

    public OperationResult AddStock(int quantity, decimal unitPrice)
    {
        if (quantity < 0)
            return PartErrors.InvalidQuantity();
        
        if (unitPrice < 0)
            return PartErrors.InvalidPrice();
        
        decimal totalCurrentCost = Stock * Price;
        decimal totalNewCost = quantity * unitPrice;
        int totalQuantity = Stock + quantity;

        Price = (totalCurrentCost + totalNewCost) / totalQuantity;
        
        Stock += quantity;
        
        ResolveAwaitingReservations();
        
        return OperationResult.Success();
    }
    
    public OperationResult AdjustStock(int newStock)
    {
        if (newStock < 0)
            return PartErrors.InvalidStock();
        
        if (newStock < Reserved)
            return PartErrors.StockLowerThanReservations();
        
        int oldStock = Stock;
        Stock = newStock;
        
        if (newStock > oldStock)
        {
            ResolveAwaitingReservations();
        }
        
        return OperationResult.Success();
    }

    public OperationResult<PartReservation> Reserve(RepairId repairId, int quantity)
    {
        if (Available < quantity)
        {
            var reservationResult = PartReservation.Create(Id, repairId,quantity, 0, ReservationStatus.AwaitingStock);
            if(reservationResult.IsFailure)
                return reservationResult.Error;
            
            _reservations.Add(reservationResult.Value);
            return reservationResult.Value;
        }
        
        var newReservationResult = PartReservation.Create(Id, repairId, quantity, quantity, ReservationStatus.Reserved);
        if(newReservationResult.IsFailure)
            return newReservationResult.Error;
        Reserved += quantity;
        _reservations.Add(newReservationResult.Value);
        return newReservationResult.Value;
    }
    
    public OperationResult AdjustReservation(RepairId repairId, int newRequested)
    {
        var reservation = _reservations
            .SingleOrDefault(r => r.RepairId == repairId);

        if (reservation == null)
            return PartReservationErrors.ReservationNotFound();

        if (newRequested <= 0)
            return PartErrors.InvalidQuantity();

        int oldRequested = reservation.QuantityRequested;
        int oldReserved = reservation.QuantityReserved;

        if (newRequested == oldRequested)
            return OperationResult.Success();

        if (newRequested < oldRequested)
        {
            int reduceBy = oldRequested - newRequested;
            return ReduceReservation(reservation, reduceBy);
        }
        else
        {
            int increaseBy = newRequested - oldRequested;
            return IncreaseReservation(reservation, increaseBy);
        }
    }
    
    private OperationResult ReduceReservation(PartReservation reservation, int reduceBy)
    {
        int reservedReduction = Math.Min(reservation.QuantityReserved, reduceBy);

        reservation.AdjustRequestedQuantity(reservation.QuantityRequested-reduceBy);
        reservation.AdjustReservedQuantity(reservation.QuantityReserved-reservedReduction);
        Reserved -= reservedReduction;
        
        if (reservation.QuantityRequested == 0)
            reservation.MarkCanceled();

        return OperationResult.Success();
    }
    
    private OperationResult IncreaseReservation(PartReservation reservation, int increaseBy)
    {
        reservation.AdjustRequestedQuantity(reservation.QuantityRequested+increaseBy);
        
        if (Available >= increaseBy)
        {
            reservation.AdjustReservedQuantity(reservation.QuantityReserved+increaseBy);
            Reserved += increaseBy;
        }
        
        if (reservation.QuantityReserved == reservation.QuantityRequested)
            reservation.MarkReserved();
        else
            reservation.MarkAwaitingStock();
        
        return OperationResult.Success();
    }

    public OperationResult ConsumeReservationsForRepair(RepairId repairId)
    {
        var reservations = _reservations
            .Where(r => r.RepairId == repairId && r.Status == ReservationStatus.Reserved)
            .ToList();

        if (!reservations.Any())
            return PartReservationErrors.ReservationNotFound();

        foreach (var reservation in reservations)
        {
            Stock -= reservation.QuantityReserved;
            Reserved -= reservation.QuantityReserved;
            reservation.MarkConsumed();
        }

        return OperationResult.Success();
    }
    
    public OperationResult CancelReservationsForRepair(RepairId repairId)
    {
        var reservations = _reservations
            .Where(r => r.RepairId == repairId && r.Status == ReservationStatus.Reserved)
            .ToList();

        if (!reservations.Any())
            return PartReservationErrors.ReservationNotFound();

        foreach (var reservation in reservations)
        {
            Reserved -= reservation.QuantityReserved;
            reservation.MarkCanceled();
        }

        return OperationResult.Success();
    }
    
    public void ResolveAwaitingReservations()
    {
        var awaitingReservations = _reservations
            .Where(r => r.Status == ReservationStatus.AwaitingStock)
            .ToList();
        
        foreach (var reservation in awaitingReservations)
        {
            if (Available >= reservation.QuantityRequested)
            {
                Reserved += reservation.QuantityRequested;
                reservation.MarkReserved();
                
                RaiseEvent(new ReservationFulfilledEvent{RepairId=reservation.RepairId, PartReservationId = reservation.Id});
            }
        }
    }

    public void FlagForReorder()
    {
        NeedsReorder = true;
    }

    public void UnflagForReorder()
    {
        NeedsReorder = false;
    }
}