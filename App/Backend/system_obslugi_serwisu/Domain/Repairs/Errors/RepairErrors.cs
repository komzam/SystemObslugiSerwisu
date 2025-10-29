using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public static class RepairErrors
{
    private static readonly string Prefix = "Repairs";
    
    public static OperationError RepairNotFound(string message = "Repair not found") => 
        new ($"{Prefix}.RepairNotFound", message);
    
    public static OperationError AdditionalCommentTooLong(string message = "Additional comment is too long") =>
        new ($"{Prefix}.AdditionalCommentTooLong", message);
}