using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairShops;

public static class RepairShopErrors
{
    private static readonly string Prefix = "RepairShops";

    public static OperationError RepairShopNotFound(string message = "Repair shop not found") =>
        new ($"{Prefix}.RepairShopNotFound", message);
}