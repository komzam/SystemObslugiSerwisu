using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.RejectQuote;

public class RejectQuoteCommand: IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}