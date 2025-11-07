using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.FinalizeDelivery;

public class FinalizeDeliveryCommand : IRequest<OperationResult>
{
    public required Guid RepairId { get; init; }
    public required Guid UserId { get; init; }
    public required ActingRole ActingRole { get; init; }
}