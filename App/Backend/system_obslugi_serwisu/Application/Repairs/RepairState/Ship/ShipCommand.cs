using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.Ship;

public class ShipCommand: IRequest<OperationResult>
{
    public required Guid RepairId { get; init; }
    public required Guid WorkerId { get; init; }
}