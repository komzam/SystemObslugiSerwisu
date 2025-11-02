using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.StartRepair;

public class StartRepairCommand: IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}