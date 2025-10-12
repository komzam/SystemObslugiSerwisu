using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared.Errors;

public static class EmailErrors
{
    private static readonly string Prefix = "Email";
    
    public static OperationError InvalidEmail(string message = "Invalid email") =>
        new ($"{Prefix}.InvalidEmail", message);
    
    public static OperationError EmailTooLong(string message = "The email is too long") =>
        new ($"{Prefix}.EmailTooLong", message);
}