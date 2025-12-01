using MediatR;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Workers.GetList;

public class GetWorkerListCommand: IRequest<OperationResult<List<Worker>>>
{
    public required List<Guid> WorkerIds { get; set; }
}