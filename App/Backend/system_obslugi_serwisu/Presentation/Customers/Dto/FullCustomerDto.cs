using HotChocolate.Authorization;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Presentation.Auth.Dto;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Customers.Dto;

public class FullCustomerDto : IMeResult
{
    public required Guid Id { get; set; }
    public required string Email { get; set; }
    public required string Name { get; set; }
    public bool IsBusiness { get; set; }
    public string? Phone { get; set; }
    public string? PhoneRegionCode { get; set; }
    public ContactMethod? PreferredContactMethod { get; set; }
    public ReturnMethod? PreferredReturnMethod { get; set; }
    public AddressDto? Address { get; set; }
}