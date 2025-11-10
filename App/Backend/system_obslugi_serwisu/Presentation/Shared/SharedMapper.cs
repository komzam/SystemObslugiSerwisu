using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Shared.Errors;
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
            Country = address.Country

        };
        return addressDto;
    }

    public static ImageDto ToDto(Image image)
    {
        return new ImageDto
        {
            Small = image.Small,
            Medium = image.Medium,
            Large = image.Large,
            ExtraLarge = image.ExtraLarge,
        };
    }

    public static OperationResult<Address> FromDto(AddressDto addressDto)
    {
        var address = Address.Create(new()
        {
            RecipientName = addressDto.RecipientName,
            Street = addressDto.Street,
            BuildingNumber = addressDto.BuildingNumber,
            ApartmentNumber = addressDto.ApartmentNumber,
            PostalCode = addressDto.PostalCode,
            City = addressDto.City,
            Country = addressDto.Country
        });
        
        return address;
    }
}