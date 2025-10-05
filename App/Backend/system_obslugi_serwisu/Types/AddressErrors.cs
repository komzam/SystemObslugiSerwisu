namespace system_obslugi_serwisu.Types;

public class AddressErrors
{
    private static string _prefix = "Address";
    
    public static Error InvalidFullName(string message = "Invalid full name") => 
        new ($"{_prefix}.InvalidFullName", message);
    
    public static Error InvalidStreet(string message = "Invalid street") => 
        new ($"{_prefix}.InvalidStreet", message);
    
    public static Error InvalidBuildingNumber(string message = "Invalid building number") => 
        new ($"{_prefix}.InvalidBuildingNumber", message);
    
    public static Error InvalidApartamentNumber(string message = "Invalid apartament number") => 
        new ($"{_prefix}.InvalidApartamentNumber", message);
    
    public static Error InvalidPostalCode(string message = "Invalid postal code") => 
        new ($"{_prefix}.InvalidPostalCode", message);
    
    public static Error InvalidCity(string message = "Invalid city") => 
        new ($"{_prefix}.InvalidCity", message);
}