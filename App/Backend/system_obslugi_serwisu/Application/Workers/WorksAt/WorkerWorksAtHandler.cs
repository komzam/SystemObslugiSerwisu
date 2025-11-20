using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Workers.WorksAt;

public class WorkerWorksAtHandler(IUnitOfWork unitOfWork) : IRequestHandler<WorkerWorksAtCommand, OperationResult<bool>>
{
    public async Task<OperationResult<bool>> Handle(WorkerWorksAtCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if (workerResult.IsFailure)
            return workerResult.Error;

        var repairShopResult = await unitOfWork.RepairShopRepository.Get(new RepairShopId(request.RepairShopId));
        if (repairShopResult.IsFailure)
            return repairShopResult.Error;

        return workerResult.Value.IsWorkingAt(repairShopResult.Value.Id);
    }
}