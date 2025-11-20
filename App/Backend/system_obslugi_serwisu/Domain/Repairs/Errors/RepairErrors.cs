using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public static class RepairErrors
{
    private static readonly string Prefix = "Repairs";
    
    public static OperationError RepairNotFound(string message = "Repair not found") => 
        new ($"{Prefix}.RepairNotFound", message);
    
    public static OperationError RepairClosed(string message = "Repair is closed") => 
        new ($"{Prefix}.RepairClosed", message);
    
    public static OperationError AdditionalCommentTooLong(string message = "Additional comment is too long") =>
        new ($"{Prefix}.AdditionalCommentTooLong", message);
    
    public static OperationError AccessDenied(string message = "Access to repair denied") =>
        new ($"{Prefix}.AccessDenied", message);
    
    public static OperationError InvalidTrigger(string message = "Invalid trigger") =>
        new ($"{Prefix}.InvalidTrigger", message);
}