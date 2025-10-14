using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops;

public class RepairShopDto
{
    public required string Id { get ; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required AddressDto Address { get; set; }
    public required OpeningHoursDto OpeningHours { get; set; }
}