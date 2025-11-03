using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Presentation.Repairs.Dto.RepairSteps;

[InterfaceType]
public abstract class RepairStepDto 
{
    public required Guid Id { get; set; }
    public required RepairStatus Status { get; set; }
    public string? Description { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
}