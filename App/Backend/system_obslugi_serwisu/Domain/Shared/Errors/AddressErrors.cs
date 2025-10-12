using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared.Errors;

public static class AddressErrors
{
    private static string _prefix = "Address";
    
    public static OperationError InvalidRecipientName(string message = "Invalid recipient name") => 
        new ($"{_prefix}.InvalidRecipientName", message);
    
    public static OperationError RecipientNameTooLong(string message = "Recipient name is too long") => 
        new ($"{_prefix}.RecipientNameTooLong", message);
    
    public static OperationError InvalidStreet(string message = "Invalid street") => 
        new ($"{_prefix}.InvalidStreet", message);
    
    public static OperationError StreetTooLong(string message = "The street name is too long") => 
        new ($"{_prefix}.StreetTooLong", message);
    
    public static OperationError InvalidBuildingNumber(string message = "Invalid building number") => 
        new ($"{_prefix}.InvalidBuildingNumber", message);
    
    public static OperationError BuildingNumberTooLong(string message = "The building number is too long") => 
        new ($"{_prefix}.BuildingNumberTooLong", message);
    
    public static OperationError InvalidApartamentNumber(string message = "Invalid apartament number") => 
        new ($"{_prefix}.InvalidApartamentNumber", message);
    
    public static OperationError ApartamentNumberTooLong(string message = "The apartament number is too long") => 
        new ($"{_prefix}.ApartamentNumberTooLong", message);
    
    public static OperationError InvalidPostalCode(string message = "Invalid postal code") => 
        new ($"{_prefix}.InvalidPostalCode", message);
    
    public static OperationError PostalCodeTooLong(string message = "Postal code too long") => 
        new ($"{_prefix}.PostalCodeTooLong", message);
    
    public static OperationError InvalidCity(string message = "Invalid city") => 
        new ($"{_prefix}.InvalidCity", message);
    
    public static OperationError CityTooLong(string message = "The city name is too long") => 
        new ($"{_prefix}.CityTooLong", message);
    
    public static OperationError InvalidCountry(string message = "Invalid country") => 
        new ($"{_prefix}.InvalidCountry", message);
    
    public static OperationError CountryTooLong(string message = "The country name is too long") => 
        new ($"{_prefix}.CountryTooLong", message);
}