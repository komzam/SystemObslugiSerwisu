using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Errors;

public static class PartOrderErrors
{
    private static readonly string Prefix = "PartOrders";
    
    public static OperationError PartOrderNotFound(string message = "Part order not found") =>
        new ($"{Prefix}.PartOrderNotFound", message);
    
    public static OperationError AccessDenied(string message = "Part order access denied") =>
        new ($"{Prefix}.AccessDenied", message);
    
    public static OperationError PartOrderItemNotFound(string message = "Part order item not found") =>
        new ($"{Prefix}.PartOrderItemNotFound", message);
    
    public static OperationError InvalidSupplierName(string message = "Invalid supplier name") =>
        new ($"{Prefix}.InvalidSupplierName", message);
    
    public static OperationError SupplierNameTooLong(string message = "Supplier name is too long") =>
        new ($"{Prefix}.SupplierNameTooLong", message);
    
    public static OperationError InvalidSupplierOrderNumber(string message = "Invalid supplier order number") =>
        new ($"{Prefix}.InvalidSupplierOrderNumber", message);
    
    public static OperationError SupplierOrderNumberTooLong(string message = "Supplier order number is too long") =>
        new ($"{Prefix}.SupplierOrderNumberTooLong", message);
    
    public static OperationError OrderAlreadyOrdered(string message = "Part order is already ordered") =>
        new ($"{Prefix}.OrderAlreadyOrdered", message);
    
    public static OperationError OrderAlreadyReceived(string message = "Part order is already received") =>
        new ($"{Prefix}.OrderAlreadyReceived", message);
    
    public static OperationError InvalidQuantity(string message = "Invalid quantity") =>
        new ($"{Prefix}.InvalidQuantity", message);
    
    public static OperationError InvalidPrice(string message = "Invalid price") =>
        new ($"{Prefix}.InvalidPrice", message);
}