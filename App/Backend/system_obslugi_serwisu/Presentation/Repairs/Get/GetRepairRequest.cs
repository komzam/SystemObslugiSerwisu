using System.ComponentModel.DataAnnotations;

namespace system_obslugi_serwisu.Presentation.Repairs.Get;

public class GetRepairRequest
{
    public required Guid RepairId { get; set; }
}