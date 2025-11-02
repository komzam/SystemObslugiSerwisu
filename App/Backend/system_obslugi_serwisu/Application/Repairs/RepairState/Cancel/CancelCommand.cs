using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.Cancel;

public class CancelCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}