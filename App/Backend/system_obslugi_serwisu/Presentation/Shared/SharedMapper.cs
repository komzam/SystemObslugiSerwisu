using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Shared;

public static class SharedMapper
{
    public static AddressDto ToDto(Address address)
    {
        var addressDto = new AddressDto
        {
            RecipientName = address.RecipientName,
            Street = address.Street,
            BuildingNumber = address.BuildingNumber,
            ApartmentNumber = address.ApartmentNumber,
            PostalCode = address.PostalCode.Value,
            City = address.City,
            Country = address.Country.ToString()

        };
        return addressDto;
    }
    
    public static OperationResult<Address> FromDto(AddressDto addressDto)
    {
        if (!Enum.TryParse<Country>(addressDto.Country, out var country))
            return AddressErrors.InvalidCountry();

        var address = Address.Create(new()
        {
            RecipientName = addressDto.RecipientName,
            Street = addressDto.Street,
            BuildingNumber = addressDto.BuildingNumber,
            ApartmentNumber = addressDto.ApartmentNumber,
            PostalCode = addressDto.PostalCode,
            City = addressDto.City,
            Country = country
        });
        
        return address;
    }
}