using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs.RepairState.Requests;

public class SubmitQuoteRequest
{
    public required Guid RepairId { get; set; }
    public required CurrencyCode Currency { get; init; }
    public required decimal PartsCost { get; init; }
    public required decimal LaborCost { get; init; }
    public string? Description { get; init; }
}