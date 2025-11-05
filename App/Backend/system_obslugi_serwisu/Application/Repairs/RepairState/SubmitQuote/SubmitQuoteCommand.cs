using MediatR;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.SubmitQuote;

public class SubmitQuoteCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
    public CurrencyCode Currency { get; init; }
    public decimal PartsCost { get; init; }
    public decimal LaborCost { get; init; }
    public string? Description { get; init; }
}