using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts;

public record PartReservationId(Guid Value);
public class PartReservation
{
    public PartReservationId Id { get; private set; }
    public PartId PartId { get; private set; }
    public RepairId RepairId { get; private set; }
    public int QuantityReserved { get; private set; }
    public int QuantityRequested { get; private set; }
    public ReservationStatus Status { get; private set; }

    private PartReservation() { }

    private PartReservation(PartId partId, RepairId repairId, int quantityRequested, int quantityReserved, ReservationStatus status)
    {
        Id = new PartReservationId(Guid.NewGuid());
        PartId = partId;
        RepairId = repairId;
        QuantityRequested = quantityRequested;
        QuantityReserved = quantityReserved;
        Status = status;
    }

    public static OperationResult<PartReservation> Create(
        PartId partId,
        RepairId repairId,
        int quantityRequested,
        int quantityReserved,
        ReservationStatus status)
    {
        if (quantityRequested < 0 || quantityReserved < 0)
            return PartErrors.InvalidPartReservationQuantity();
        
        return new PartReservation(partId, repairId, quantityRequested, quantityReserved, status);
    }

    public void AdjustReservedQuantity(int quantity)
    {
        QuantityReserved = quantity;
    }
    
    public void AdjustRequestedQuantity(int quantity)
    {
        QuantityRequested = quantity;
    }


    public void MarkReserved()
    {
        Status = ReservationStatus.Reserved;
    }
    
    public void MarkAwaitingStock()
    {
        Status = ReservationStatus.AwaitingStock;
    }

    public void MarkConsumed()
    {
        Status = ReservationStatus.Consumed;
    }

    public void MarkCanceled()
    {
        Status = ReservationStatus.Canceled;
    }
}