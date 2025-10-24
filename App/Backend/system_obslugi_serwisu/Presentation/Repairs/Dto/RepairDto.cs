using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Presentation.Repairs.Dto;

public class RepairDto
{
    public required string Id { get; set; }
    public required string RepairShopId { get; set; }
    public RepairStatus Status { get; set; }
    public required ContactInfoDto ContactInfo { get; set; }
    public required DeviceInfoDto DeviceInfo { get; set; }
    public required FaultInfoDto FaultInfo { get; set; }
    public required ReturnInfoDto ReturnInfo { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
}