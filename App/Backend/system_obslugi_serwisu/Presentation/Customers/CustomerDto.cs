using HotChocolate.Authorization;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Customers;

public class CustomerDto
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public bool IsBusiness { get; set; }
    public string? PreferredContactMethod { get; set; }
    public string? PreferredReturnMethod { get; set; }
    public AddressDto? Address { get; set; }
}