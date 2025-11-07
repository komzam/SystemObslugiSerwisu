using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops.Dto;

public class RepairShopDto
{
    public required Guid Id { get ; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required string TimeZoneId { get; set; }
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public string? AboutUs { get; set; }
    public required AddressDto Address { get; set; }
    public required OpeningHoursDto OpeningHours { get; set; }
}