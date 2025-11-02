using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.PaymentCompleted;

public class PaymentCompletedCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}