namespace system_obslugi_serwisu.Presentation.Repairs.RepairState.Requests;

public class CompleteRepairFailureRequest
{
    public required Guid RepairId { get; set; }
    public string? Description { get; set; }
}