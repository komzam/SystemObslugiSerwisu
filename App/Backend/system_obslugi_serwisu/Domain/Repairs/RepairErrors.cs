using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public record RepairErrors
{
    private static string _prefix = "Repairs";
    
    public static OperationError RepairNotFound(string message = "Repair not found") => 
        new ($"{_prefix}.RepairNotFound", message);
}