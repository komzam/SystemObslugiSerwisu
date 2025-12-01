using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetRepairShops;

public class GetRepairShopsRepairsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairShopsRepairsCommand, OperationResult<PaginatedList<Repair>>>
{
    public async Task<OperationResult<PaginatedList<Repair>>> Handle(GetRepairShopsRepairsCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if (workerResult.IsFailure)
            return workerResult.Error;

        if (!workerResult.Value.IsWorkingAt(new RepairShopId(request.RepairShopId)))
            return RepairErrors.AccessDenied();

        var repairListResult =
            await unitOfWork.RepairRepository.GetRepairShopsRepairs(new RepairShopId(request.RepairShopId),
                request.PageNumber, request.PageSize);
        if (repairListResult.IsFailure)
            return repairListResult.Error;
        
        return repairListResult.Value;
    }
}