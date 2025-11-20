using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Workers.WorksAt;

public class WorkerWorksAtCommand : IRequest<OperationResult<bool>>
{
    public required Guid WorkerId { get; init; }
    public required Guid RepairShopId { get; init; }
}