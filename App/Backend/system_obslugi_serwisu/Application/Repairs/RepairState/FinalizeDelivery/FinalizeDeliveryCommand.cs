using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.FinalizeDelivery;

public class FinalizeDeliveryCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}