using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs.RepairState;

public class CompleteRepairSuccessRequest
{
    public required Guid RepairId { get; set; }
    public CurrencyCode? FinalCostCurrency { get; set; }
    public decimal? FinalCost { get; set; }
    public string? Description { get; set; }
}