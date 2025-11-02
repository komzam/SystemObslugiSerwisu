using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.PartsNeeded;

public class PartsNeededCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}