using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Domain.Parts.Events;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts;

public record PartOrderId(Guid Value);
public class PartOrder : AggregateRoot
{
    public const int SupplierNameMaxLength = 100;
    public const int SupplierOrderNumberMaxLength = 100;
    
    public PartOrderId Id { get; private set; }
    public string SupplierName { get; private set; }
    public string? SupplierOrderNumber { get; private set; }
    public PartOrderStatus Status { get; private set; }
    public decimal Cost => Items.Sum(x => x.Cost);
    public DateTimeOffset? OrderedAt { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    public IReadOnlyList<PartOrderItem> Items => _items.AsReadOnly();
    private List<PartOrderItem> _items = new();
    
    private PartOrder(){}

    private PartOrder(string supplierName)
    {
        Id = new PartOrderId(Guid.NewGuid());
        SupplierName = supplierName;
        Status = PartOrderStatus.Created;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    private static OperationResult ValidateSupplierName(string supplierName)
    {
        if (String.IsNullOrWhiteSpace(supplierName))
            return PartOrderErrors.InvalidSupplierName();
        
        if (supplierName.Length > SupplierNameMaxLength)
            return PartOrderErrors.SupplierNameTooLong();
        
        return OperationResult.Success();
    }

    private static OperationResult ValidateSupplierOrderNumber(string supplierOrderNumber)
    {
        if (String.IsNullOrWhiteSpace(supplierOrderNumber))
            return PartOrderErrors.InvalidSupplierOrderNumber();
        
        if (supplierOrderNumber.Length > SupplierOrderNumberMaxLength)
            return PartOrderErrors.SupplierOrderNumberTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<PartOrder> Create(string supplierName)
    {
        supplierName = supplierName.Trim();
        var validateResult = ValidateSupplierName(supplierName);
        if (validateResult.IsFailure)
            return validateResult.Error;
        
        return new PartOrder(supplierName);
    }

    public OperationResult CanBeDeleted()
    {
        if (Status != PartOrderStatus.Created)
            return PartOrderErrors.OrderAlreadyOrdered();
        
        return OperationResult.Success();
    }

    public OperationResult ChangeSupplierName(string newSupplierName)
    {
        if (Status == PartOrderStatus.Received)
            return PartOrderErrors.OrderAlreadyReceived();
        
        var validateResult = ValidateSupplierName(newSupplierName);
        if (validateResult.IsFailure)
            return validateResult.Error;
        
        SupplierName = newSupplierName;
        return OperationResult.Success();
    }
    
    public OperationResult ChangeSupplierOrderNumber(string newSupplierOrderNumber)
    {
        if (Status == PartOrderStatus.Received)
            return PartOrderErrors.OrderAlreadyReceived();

        if (Status == PartOrderStatus.Created)
            return PartOrderErrors.AccessDenied();
        
        var validateResult = ValidateSupplierOrderNumber(newSupplierOrderNumber);
        if (validateResult.IsFailure)
            return validateResult.Error;
        
        SupplierOrderNumber = newSupplierOrderNumber;
        return OperationResult.Success();
    }

    public OperationResult Order(string supplierOrderNumber)
    {
        if (Status != PartOrderStatus.Created)
            return PartOrderErrors.OrderAlreadyOrdered();
        
        var validateResult = ValidateSupplierOrderNumber(supplierOrderNumber);
        if (validateResult.IsFailure)
            return validateResult.Error;

        Status = PartOrderStatus.Ordered;
        OrderedAt = DateTimeOffset.UtcNow;
        
        RaiseEvent(new OrderOrderedEvent{PartOrderId = Id});
        
        return OperationResult.Success();
    }
    
    public OperationResult Receive()
    {
        if (Status == PartOrderStatus.Created)
            return PartOrderErrors.AccessDenied();
        
        if (Status == PartOrderStatus.Received)
            return PartOrderErrors.OrderAlreadyReceived();
        
        Status = PartOrderStatus.Received;
        RaiseEvent(new OrderReceivedEvent{PartOrderId = Id});
        
        return OperationResult.Success();
    }

    public OperationResult AddItem(PartId partId, int quantity, decimal price)
    {
        if (Status != PartOrderStatus.Created)
            return PartOrderErrors.OrderAlreadyOrdered();

        var orderItemResult = PartOrderItem.Create(Id, partId, quantity, price);
        if(orderItemResult.IsFailure)
            return orderItemResult.Error;
        
        _items.Add(orderItemResult.Value);
        
        return OperationResult.Success();
    }
    
    public OperationResult AddItem(Part part)
    {
        return AddItem(part.Id, part.DefaultOrderQuantity(), part.Price);
    }

    public OperationResult RemoveItem(PartOrderItemId itemId)
    {
        if (Status != PartOrderStatus.Created)
            return PartOrderErrors.OrderAlreadyOrdered();

        var item = _items.FirstOrDefault(item => item.Id == itemId);
        if (item == null)
            return PartOrderErrors.PartOrderItemNotFound();
        
        _items.Remove(item);
        return OperationResult.Success();
    }

    public OperationResult EditItem(PartOrderItemId itemId, int? quantity, decimal? price)
    {
        if (Status != PartOrderStatus.Created)
            return PartOrderErrors.OrderAlreadyOrdered();
        
        var item = _items.FirstOrDefault(item => item.Id == itemId);
        if (item == null)
            return PartOrderErrors.PartOrderItemNotFound();

        if (quantity != null)
        {
            var changeResult = item.ChangeQuantity(quantity.Value);
            if(changeResult.IsFailure)
                return changeResult.Error;
        }

        if (price != null)
        {
            var changeResult = item.ChangePrice(price.Value);
            if(changeResult.IsFailure)
                return changeResult.Error;
        }

        return OperationResult.Success();
    }
}