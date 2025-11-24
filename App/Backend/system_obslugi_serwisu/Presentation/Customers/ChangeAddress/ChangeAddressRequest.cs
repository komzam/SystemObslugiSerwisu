using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Presentation.Customers.ChangeAddress;

public class ChangeAddressRequest
{
    public required string RecipientName { get; set; }
    public required string Street { get; set; }
    public required string BuildingNumber { get; set; }
    public string? ApartmentNumber { get; set; }
    public required string PostalCode { get; set; }
    public required string City { get; set; }
    public required Country Country { get; set; }
}