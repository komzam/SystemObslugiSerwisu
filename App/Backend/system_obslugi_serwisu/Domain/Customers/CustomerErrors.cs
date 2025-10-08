using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Customers;

public static class CustomerErrors
{
    private static readonly string Prefix = "Customers";

    public static OperationError CustomerNotFound(string message = "Customer not found") =>
        new ($"{Prefix}.CustomerNotFound", message);
    
    public static OperationError InvalidName(string message = "Invalid name") =>
        new ($"{Prefix}.InvalidName", message);
    
    public static OperationError NameTooLong(string message = "The name is too long") =>
        new ($"{Prefix}.NameTooLong", message);
    
    public static OperationError TinTooLong (string message = "The Tax Identification Number is too long") =>
        new ($"{Prefix}.TinTooLong", message);
    
    public static OperationError InvalidTin (string message = "Invalid Tax Identification Number") =>
        new ($"{Prefix}.InvalidTin", message);
}