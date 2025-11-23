using MediatR;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Workers.Get;

public class GetWorkerCommand : IRequest<OperationResult<Worker>>
{
    public required Guid WorkerId { get; set; }
}