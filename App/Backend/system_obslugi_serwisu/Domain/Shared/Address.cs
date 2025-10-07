using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared;

public record AddressData
{
    public required string FullName { get; init; }
    public required string Street { get; init; }
    public required string BuildingNumber { get; init; }
    public required string ApartmentNumber { get; init; }
    public required string PostalCode { get; init; }
    public required string City { get; init; }
    public required Country Country { get; init; }
        
};

public class Address : ValueObject
{
    public string FullName { get; }
    public string Street { get; }
    public string BuildingNumber { get; }
    public string ApartmentNumber { get; }
    public PostalCode PostalCode { get; }
    public string City { get; }
    public Country Country { get; }

    private Address(string fullName, string street, string buildingNumber,
        string apartmentNumber, PostalCode postalCode, string city, Country country)
    {
        FullName = fullName;
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

        return new Address(data.FullName, data.Street, data.BuildingNumber, data.ApartmentNumber,
            postalCodeResult.Value, data.City, data.Country);
    }
    
    private static AddressData TrimValues(AddressData data)
    {
        return new AddressData
        {
            FullName = data.FullName.Trim(),
            Street = data.Street.Trim(),
            BuildingNumber = data.BuildingNumber.Trim(),
            ApartmentNumber = data.ApartmentNumber.Trim(),
            PostalCode = data.PostalCode.Trim(),
            City = data.City.Trim(),
            Country = data.Country
        };
    }

    private static OperationResult CheckForEmptyFields(AddressData data)
    {
        if (String.IsNullOrEmpty(data.FullName))
            return AddressErrors.InvalidFullName();
        
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
        yield return FullName;
        yield return Street;
        yield return BuildingNumber;
        yield return ApartmentNumber;
        yield return PostalCode;
        yield return City;
        yield return Country;
    }
}