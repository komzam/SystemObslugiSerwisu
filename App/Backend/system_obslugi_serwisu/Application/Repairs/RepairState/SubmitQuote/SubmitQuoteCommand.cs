using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.SubmitQuote;

public class SubmitQuoteCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}