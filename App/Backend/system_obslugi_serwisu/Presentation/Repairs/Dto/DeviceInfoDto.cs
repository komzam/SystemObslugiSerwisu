using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Presentation.Repairs.Dto;

public class DeviceInfoDto
{
    public DeviceType DeviceType { get; set; }
    public required string Manufacturer { get; set; }
    public required string Model { get; set; }
    public required string SerialNumber { get; set; }
}