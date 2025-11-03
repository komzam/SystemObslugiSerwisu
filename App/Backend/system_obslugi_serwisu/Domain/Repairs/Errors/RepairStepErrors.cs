using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public static class RepairStepErrors
{
    private static readonly string Prefix = "RepairSteps";
    
    public static OperationError DescriptionTooLong(string message = "Description is too long") => 
        new ($"{Prefix}.DescriptionTooLong", message);
    
    public static OperationError CurrencyMismatch(string message = "All money values should have the same currency") => 
        new ($"{Prefix}.CurrencyMismatch", message);
}