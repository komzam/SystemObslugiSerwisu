using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Errors;

public static class PartErrors
{
    private static readonly string Prefix = "Parts";

    public static OperationError PartNotFound(string message = "Part not found") =>
        new ($"{Prefix}.PartNotFound", message);
    
    public static OperationError InvalidQuantity(string message = "Invalid part quantity") =>
        new ($"{Prefix}.InvalidQuantity", message);
    
    public static OperationError ReservationNotFound(string message = "Reservation not found") =>
        new ($"{Prefix}.ReservationNotFound", message);
    
    public static OperationError InvalidPartNeededQuantity(string message = "Invalid parts needed quantity") =>
        new ($"{Prefix}.InvalidPartNeededQuantity", message);
    
    public static OperationError InvalidPartReservationQuantity(string message = "Invalid part reservation quantity") =>
        new ($"{Prefix}.InvalidPartReservationQuantity", message);
    
    public static OperationError InvalidStock(string message = "Invalid part stock") =>
        new ($"{Prefix}.InvalidStock", message);
    
    public static OperationError StockLowerThanReservations(string message = "New stock is lower than count needed for reservations") =>
        new ($"{Prefix}.StockLowerThanReservations", message);
    
    public static OperationError InvalidLowStockThreshold(string message = "Invalid part low stock threshold") =>
        new ($"{Prefix}.InvalidLowStockThreshold", message);
    
    public static OperationError InvalidName(string message = "Invalid part name") =>
        new ($"{Prefix}.InvalidName", message);
    
    public static OperationError NameTooLong(string message = "Part name is too long") =>
        new ($"{Prefix}.NameTooLong", message);
}