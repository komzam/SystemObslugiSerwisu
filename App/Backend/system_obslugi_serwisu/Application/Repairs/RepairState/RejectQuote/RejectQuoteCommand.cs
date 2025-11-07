using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.RejectQuote;

public class RejectQuoteCommand: IRequest<OperationResult>
{
    public required Guid RepairId { get; init; }
    public required Guid UserId { get; init; }
    public required ActingRole ActingRole { get; set; }
}