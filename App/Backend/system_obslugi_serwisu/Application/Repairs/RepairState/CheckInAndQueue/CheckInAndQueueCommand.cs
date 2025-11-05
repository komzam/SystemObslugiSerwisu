using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CheckInAndQueue;

public class CheckInAndQueueCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
    public string? Description { get; init; }
}