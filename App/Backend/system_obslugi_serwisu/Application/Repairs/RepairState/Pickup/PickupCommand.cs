using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.Pickup;

public class PickupCommand: IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}