using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Services.Errors;

public static class ServiceErrors
{
    private static readonly string Prefix = "Serivces";
    
    public static OperationError ServiceNotFound(string message = "Service not found") => 
        new ($"{Prefix}.ServiceNotFound", message);
    
    public static OperationError NameTooLong(string message = "The name is too long") => 
        new ($"{Prefix}.NameTooLong", message);
    
    public static OperationError InvalidName(string message = "Invalid name") => 
        new ($"{Prefix}.InvalidName", message);
}