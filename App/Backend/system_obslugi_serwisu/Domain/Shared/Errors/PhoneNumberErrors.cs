using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared.Errors;

public static class PhoneNumberErrors
{
    private static string _prefix = "PhoneNumber";
    
    public static OperationError PhoneNumberTooLong(string message = "Phone number is too long.") => 
        new ($"{_prefix}.PhoneNumberTooLong", message);
    
    public static OperationError InvalidPhoneNumber(string message = "Phone number is invalid.") => 
        new ($"{_prefix}.InvalidPhoneNumber", message);
}