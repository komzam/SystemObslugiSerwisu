namespace system_obslugi_serwisu.Types;

public record RepairErrors
{
    private static string _prefix = "Repairs";
    
    public static Error RepairNotFound(string message = "Repair not found") => 
        new ($"{_prefix}.RepairNotFound", message);
}