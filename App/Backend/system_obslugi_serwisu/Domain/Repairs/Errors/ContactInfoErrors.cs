using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public static class ContactInfoErrors
{
    private static readonly string Prefix = "ContactInfo";
    
    public static OperationError FullNameTooLong(string message = "The full name is too long") => 
        new ($"{Prefix}.FullNameTooLong", message);
    
    public static OperationError InvalidFullName(string message = "Invalid full name") => 
        new ($"{Prefix}.InvalidFullName", message);
}