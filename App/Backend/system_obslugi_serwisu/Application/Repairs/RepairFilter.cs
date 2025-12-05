using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Application.Repairs;

public class RepairFilter
{
    public List<RepairStatus>? Statuses { get; set; }
    public List<Guid>? WorkerIds { get; set; }
    
    public string? SearchTerm { get; set; }
}