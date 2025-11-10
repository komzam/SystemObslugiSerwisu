using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairShops.Errors;

public static class RepairShopErrors
{
    private static readonly string Prefix = "RepairShops";

    public static OperationError RepairShopNotFound(string message = "Repair shop not found") =>
        new ($"{Prefix}.RepairShopNotFound", message);

    public static OperationError AccessDenied(string message = "Access to repair shop is denied") =>
        new ($"{Prefix}.AccessDenied", message);
    
    public static OperationError InvalidName(string message = "Invalid name") =>
        new ($"{Prefix}.InvalidName", message);
    
    public static OperationError NameTooLong(string message = "The name is too long") =>
        new ($"{Prefix}.NameTooLong", message);
}