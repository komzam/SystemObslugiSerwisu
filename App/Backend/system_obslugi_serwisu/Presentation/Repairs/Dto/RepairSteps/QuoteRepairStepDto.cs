namespace system_obslugi_serwisu.Presentation.Repairs.Dto.RepairSteps;

public class QuoteRepairStepDto : RepairStepDto
{
    public required string LaborCost { get; set; }
    public required string PartsCost { get; set; }
    public required string TotalCost { get; set; }
    public bool? QuoteAccepted { get; set; }
}