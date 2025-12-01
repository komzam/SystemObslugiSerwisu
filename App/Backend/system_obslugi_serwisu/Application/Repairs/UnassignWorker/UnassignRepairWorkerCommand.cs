using MediatR;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.UnassignWorker;

public class UnassignRepairWorkerCommand : IRequest<OperationResult>
{
    public required Guid RequesterId { get; init; }
    public required Guid RepairId { get; init; }
}