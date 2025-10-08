using System.ComponentModel.DataAnnotations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared;

public record AddressData
{
    public required string RecipientName { get; init; }
    public required string Street { get; init; }
    public required string BuildingNumber { get; init; }
    public string? ApartmentNumber { get; init; }
    public required string PostalCode { get; init; }
    public required string City { get; init; }
    public required Country Country { get; init; }
        
};

public class Address : ValueObject
{
    [MaxLength(100)]
    public string RecipientName { get; private set; }
    
    [MaxLength(50)]
    public string Street { get; private set; }
    
    [MaxLength(20)]
    public string BuildingNumber { get; private set; }
    
    [MaxLength(20)]
    public string? ApartmentNumber { get; private set; }
    
    public PostalCode PostalCode { get; private set; }
    
    [MaxLength(100)]
    public string City { get; private set; }
    
    public Country Country { get; private set; }
    
    private Address() { } // For EF Core

    private Address(string recipientName, string street, string buildingNumber,
        string? apartmentNumber, PostalCode postalCode, string city, Country country)
    {
        RecipientName = recipientName;
        Street = street;
        BuildingNumber = buildingNumber;
        ApartmentNumber = apartmentNumber;
        PostalCode = postalCode;
        City = city;
        Country = country;
    }
    
    public static OperationResult<Address> Create(AddressData data)
    {
        data = TrimValues(data);

        var emptyFieldsResult = CheckForEmptyFields(data);
        if (emptyFieldsResult.IsFailure)
            return emptyFieldsResult.Error;

        var postalCodeResult = PostalCode.Create(data.PostalCode, data.Country);
        if (postalCodeResult.IsFailure)
            return postalCodeResult.Error;

        return new Address(data.RecipientName, data.Street, data.BuildingNumber, data.ApartmentNumber,
            postalCodeResult.Value, data.City, data.Country);
    }
    
    private static AddressData TrimValues(AddressData data)
    {
        return new AddressData
        {
            RecipientName = data.RecipientName.Trim(),
            Street = data.Street.Trim(),
            BuildingNumber = data.BuildingNumber.Trim(),
            ApartmentNumber = data.ApartmentNumber?.Trim(),
            PostalCode = data.PostalCode.Trim(),
            City = data.City.Trim(),
            Country = data.Country
        };
    }

    private static OperationResult CheckFieldLengths(AddressData data)
    {
        if (data.RecipientName.Length > 100)
            return AddressErrors.RecipientNameTooLong();
        
        if (data.Street.Length > 50)
            return AddressErrors.StreetTooLong();
        
        if (data.BuildingNumber.Length > 20)
            return AddressErrors.BuildingNumberTooLong();
        
        if (data.ApartmentNumber != null && data.ApartmentNumber.Length > 20)
            return AddressErrors.ApartamentNumberTooLong();
        
        if (data.City.Length > 100)
            return AddressErrors.CityTooLong();
        
        return OperationResult.Success();
    }

    private static OperationResult CheckForEmptyFields(AddressData data)
    {
        if (String.IsNullOrEmpty(data.RecipientName))
            return AddressErrors.InvalidRecipientName();
        
        if (String.IsNullOrEmpty(data.Street))
            return AddressErrors.InvalidStreet();
        
        if (String.IsNullOrEmpty(data.BuildingNumber))
            return AddressErrors.InvalidBuildingNumber();
        
        if (String.IsNullOrEmpty(data.PostalCode))
            return AddressErrors.InvalidPostalCode();
        
        if (String.IsNullOrEmpty(data.City))
            return AddressErrors.InvalidCity();

        return OperationResult.Success();
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return RecipientName;
        yield return Street;
        yield return BuildingNumber;
        yield return ApartmentNumber?? String.Empty;
        yield return PostalCode;
        yield return City;
        yield return Country;
    }
}