using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts;

public record PartOrderItemId(Guid Value);
public class PartOrderItem
{
    public PartOrderItemId Id { get; private set; }
    public PartOrderId PartOrderId { get; private set;}
    public PartId PartId { get; private set; }
    public int Quantity { get; private set; }
    public decimal Price { get; private set; }
    public decimal Cost  => Quantity * Price;
    
    private PartOrderItem(){}

    private PartOrderItem(PartOrderId partOrderId, PartId partId, int quantity, decimal price)
    {
        Id = new PartOrderItemId(Guid.NewGuid());
        PartOrderId = partOrderId;
        PartId = partId;
        Quantity = quantity;
        Price = price;
    }

    private static OperationResult ValidateInput(int quantity, decimal price)
    {
        if (quantity <= 0)
            return PartOrderErrors.InvalidQuantity();
        
        if (price < 0)
            return PartOrderErrors.InvalidPrice();

        return OperationResult.Success();
    }

    public static OperationResult<PartOrderItem> Create(PartOrderId partOrderId, PartId partId, int quantity, decimal price)
    {
        var validateResult = ValidateInput(quantity, price);
        if (validateResult.IsFailure)
            return validateResult.Error;
        
        return new PartOrderItem(partOrderId, partId, quantity, price);
    }

    public OperationResult ChangePrice(decimal newPrice)
    {
        if (newPrice < 0)
            return PartOrderErrors.InvalidPrice();
        
        Price = newPrice;
        return OperationResult.Success();
    }
    
    public OperationResult ChangeQuantity(int newQuantity)
    {
        if (newQuantity <= 0)
            return PartOrderErrors.InvalidQuantity();
        
        Quantity = newQuantity;
        return OperationResult.Success();
    }
}