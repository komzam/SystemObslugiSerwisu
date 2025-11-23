using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Workers.Get;

public class GetWorkerHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetWorkerCommand, OperationResult<Worker>>
{
    public async Task<OperationResult<Worker>> Handle(GetWorkerCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if (workerResult.IsFailure)
            return workerResult.Error;
        
        return workerResult.Value;
    }
}