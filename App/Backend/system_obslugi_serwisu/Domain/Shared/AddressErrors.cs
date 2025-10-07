using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared;

public class AddressErrors
{
    private static string _prefix = "Address";
    
    public static OperationError InvalidFullName(string message = "Invalid full name") => 
        new ($"{_prefix}.InvalidFullName", message);
    
    public static OperationError InvalidStreet(string message = "Invalid street") => 
        new ($"{_prefix}.InvalidStreet", message);
    
    public static OperationError InvalidBuildingNumber(string message = "Invalid building number") => 
        new ($"{_prefix}.InvalidBuildingNumber", message);
    
    public static OperationError InvalidApartamentNumber(string message = "Invalid apartament number") => 
        new ($"{_prefix}.InvalidApartamentNumber", message);
    
    public static OperationError InvalidPostalCode(string message = "Invalid postal code") => 
        new ($"{_prefix}.InvalidPostalCode", message);
    
    public static OperationError InvalidCity(string message = "Invalid city") => 
        new ($"{_prefix}.InvalidCity", message);
}