using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public static class DeviceInfoErrors
{
    private static readonly string Prefix = "DeviceInfo";
    
    public static OperationError ManufacturerTooLong(string message = "The manufacturer name is too long") => 
        new ($"{Prefix}.ManufacturerTooLong", message);
    
    public static OperationError InvalidManufacturer(string message = "Invalid device manufacturer") => 
        new ($"{Prefix}.InvalidManufacturer", message);
    
    public static OperationError ModelTooLong(string message = "The model name is too long") => 
        new ($"{Prefix}.ModelTooLong", message);
    
    public static OperationError InvalidModel(string message = "Invalid device model") => 
        new ($"{Prefix}.InvalidModel", message);
    
    public static OperationError SerialNumberTooLong(string message = "The serial number is too long") => 
        new ($"{Prefix}.SerialNumberTooLong", message);
    
    public static OperationError InvalidSerialNumber(string message = "Invalid device serial number") => 
        new ($"{Prefix}.InvalidSerialNumber", message);
}