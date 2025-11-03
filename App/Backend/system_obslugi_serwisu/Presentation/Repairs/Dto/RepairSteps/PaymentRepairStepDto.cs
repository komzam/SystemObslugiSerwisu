namespace system_obslugi_serwisu.Presentation.Repairs.Dto.RepairSteps;

public class PaymentRepairStepDto : RepairStepDto
{
    public required string Amount { get; set; }
    public required bool Paid { get; set; }
}