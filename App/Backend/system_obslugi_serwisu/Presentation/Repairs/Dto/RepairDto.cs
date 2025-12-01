using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Presentation.Repairs.Dto.RepairSteps;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;

namespace system_obslugi_serwisu.Presentation.Repairs.Dto;

public class RepairDto
{
    public required Guid Id { get; set; }
    public required String TicketNumber { get; set; }
    public required Guid RepairShopId { get; set; }
    public required Guid? ConversationId { get; set; }
    public RepairStatus Status { get; set; }
    public required ContactInfoDto ContactInfo { get; set; }
    public required DeviceInfoDto DeviceInfo { get; set; }
    public required FaultInfoDto FaultInfo { get; set; }
    public required ReturnInfoDto ReturnInfo { get; set; }
    public string? AdditionalComment { get; set; }
    [GraphQLIgnore]
    public required Guid? AssignedWorkerId { get; set; }
    public required List<RepairStepDto> RepairHistory { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
}