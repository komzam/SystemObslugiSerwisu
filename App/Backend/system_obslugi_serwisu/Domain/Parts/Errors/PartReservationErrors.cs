using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Errors;

public static class PartReservationErrors
{
    private static readonly string Prefix = "PartReservations";
    
    public static OperationError ReservationNotFound(string message = "Reservation not found") =>
        new ($"{Prefix}.ReservationNotFound", message);
    
    public static OperationError InvalidQuantity(string message = "Invalid part reservation quantity") =>
        new ($"{Prefix}.InvalidQuantity", message);
}