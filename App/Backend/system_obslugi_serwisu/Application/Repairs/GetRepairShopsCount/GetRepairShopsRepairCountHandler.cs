using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetRepairShopsCount;

public class GetRepairShopsRepairCountHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairShopsRepairCountCommand, OperationResult<int>>
{
    public async Task<OperationResult<int>> Handle(GetRepairShopsRepairCountCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if (workerResult.IsFailure)
            return workerResult.Error;

        if (!workerResult.Value.IsWorkingAt(new RepairShopId(request.RepairShopId)))
            return RepairErrors.AccessDenied();

        var countResult =
            await unitOfWork.RepairRepository.GetRepairShopsRepairCount(new RepairShopId(request.RepairShopId),
                request.Status);
        if (countResult.IsFailure)
            return countResult.Error;
        
        return countResult.Value;
    }
}