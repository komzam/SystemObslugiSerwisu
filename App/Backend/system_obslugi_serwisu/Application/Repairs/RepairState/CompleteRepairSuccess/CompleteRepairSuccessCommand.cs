using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairSuccess;

public class CompleteRepairSuccessCommand: IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}