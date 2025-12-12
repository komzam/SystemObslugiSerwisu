using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Errors;

public static class PartErrors
{
    private static readonly string Prefix = "Parts";

    public static OperationError PartNotFound(string message = "Part not found") =>
        new ($"{Prefix}.PartNotFound", message);

    public static OperationError InvalidName(string message = "Invalid part name") =>
        new ($"{Prefix}.InvalidName", message);
    
    public static OperationError NameTooLong(string message = "Part name is too long") =>
        new ($"{Prefix}.NameTooLong", message);
    
    public static OperationError InvalidManufacturerCode(string message = "Invalid manufacturer code") =>
        new ($"{Prefix}.InvalidName", message);
    
    public static OperationError ManufacturerCodeTooLong(string message = "Manufacturer code is too long") =>
        new ($"{Prefix}.NameTooLong", message);
    
    public static OperationError InvalidQuantity(string message = "Invalid part quantity") =>
        new ($"{Prefix}.InvalidQuantity", message);
    
    public static OperationError InvalidPrice(string message = "Invalid part price") =>
        new ($"{Prefix}.InvalidPrice", message);
    
    public static OperationError InvalidStock(string message = "Invalid part stock") =>
        new ($"{Prefix}.InvalidStock", message);
    
    public static OperationError StockLowerThanReservations(string message = "New stock is lower than count needed for reservations") =>
        new ($"{Prefix}.StockLowerThanReservations", message);
    
    public static OperationError InvalidLowStockThreshold(string message = "Invalid part low stock threshold") =>
        new ($"{Prefix}.InvalidLowStockThreshold", message);
}