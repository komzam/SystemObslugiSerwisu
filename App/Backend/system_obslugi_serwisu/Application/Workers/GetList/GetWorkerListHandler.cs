using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Workers.GetList;

public class GetWorkerListHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetWorkerListCommand, OperationResult<List<Worker>>>
{
    public async Task<OperationResult<List<Worker>>> Handle(GetWorkerListCommand request, CancellationToken cancellationToken)
    {
        var listOfIds = request.WorkerIds.Select(id => new WorkerId(id)).ToList();
        
        return await unitOfWork.WorkerRepository.GetWorkers(listOfIds);
    }
}