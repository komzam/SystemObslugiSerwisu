using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity;

public static class IdentityErrors
{
    private static readonly string Prefix = "Identity";
    
    public static OperationError UnknownError(string message = "Unknown Error") =>
        new ($"{Prefix}.UnknownError", message, false);
    
    public static OperationError EmailExists(string message = "This email already exists") =>
        new ($"{Prefix}.EmailExists", message);
    
    public static OperationError InvalidEmail(string message = "This email is invalid") =>
        new ($"{Prefix}.InvalidEmail", message);
    
    public static OperationError InvalidPassword(string message = "This password is invalid") =>
        new ($"{Prefix}.InvalidPassword", message);
    
    public static OperationError InvalidCredentials(string message = "Invalid credentials") =>
        new ($"{Prefix}.InvalidCredentials", message);
    
    public static OperationError LockedOut(string message = "You are locked out") =>
        new ($"{Prefix}.LockedOut", message);
    
    public static OperationError NotAllowed(string message = "You are not allowed to log in") =>
        new ($"{Prefix}.NotAllowed", message);
}