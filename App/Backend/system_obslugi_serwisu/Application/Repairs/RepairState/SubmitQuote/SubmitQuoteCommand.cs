using MediatR;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.SubmitQuote;

public class SubmitQuoteCommand : IRequest<OperationResult>
{
    public required Guid RepairId { get; init; }
    public required Guid WorkerId { get; init; }
    public required CurrencyCode Currency { get; init; }
    public required decimal PartsCost { get; init; }
    public required decimal LaborCost { get; init; }
    public string? Description { get; init; }
}