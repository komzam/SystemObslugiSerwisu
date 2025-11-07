using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Workers.Errors;

public static class WorkerErrors
{
    private static readonly string Prefix = "Workers";
    
    public static OperationError WorkerNotFound(string message = "Worker not found") => 
        new ($"{Prefix}.WorkerNotFound", message);
    
    public static OperationError FirstNameTooLong(string message = "First name is too long") => 
        new ($"{Prefix}.FirstNameTooLong", message);
    
    public static OperationError InvalidFirstName(string message = "Invalid first name") => 
        new ($"{Prefix}.InvalidFirstName", message);
    
    public static OperationError LastNameTooLong(string message = "Last name is too long") => 
        new ($"{Prefix}.LastNameTooLong", message);
    
    public static OperationError InvalidLastName(string message = "Invalid last name") => 
        new ($"{Prefix}.InvalidLastName", message);
}