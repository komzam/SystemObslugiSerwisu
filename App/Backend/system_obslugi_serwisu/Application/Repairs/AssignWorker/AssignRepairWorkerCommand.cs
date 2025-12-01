using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.AssignWorker;

public class AssignRepairWorkerCommand : IRequest<OperationResult>
{
    public required Guid RepairId { get; set; }
    public required Guid WorkerId { get; set; }
}