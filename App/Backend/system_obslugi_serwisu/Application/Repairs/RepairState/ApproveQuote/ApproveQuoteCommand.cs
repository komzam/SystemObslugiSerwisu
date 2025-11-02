using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ApproveQuote;

public class ApproveQuoteCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}