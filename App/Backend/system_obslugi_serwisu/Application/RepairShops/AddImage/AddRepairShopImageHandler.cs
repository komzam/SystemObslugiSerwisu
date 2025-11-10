using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.ImageQueue;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.RepairShops.Errors;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.AddImage;

public class AddRepairShopImageHandler(IRepairShopStorageService repairShopStorage, IUnitOfWork unitOfWork) : IRequestHandler<AddRepairShopImageCommand, OperationResult<string>>
{
    public async Task<OperationResult<string>> Handle(AddRepairShopImageCommand request, CancellationToken cancellationToken)
    {
        var repairShopResult = await unitOfWork.RepairShopRepository.Get(new RepairShopId(request.RepairShopId));
        if(repairShopResult.IsFailure)
            return repairShopResult.Error;
        
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;

        if (!workerResult.Value.IsWorkingAt(repairShopResult.Value.Id))
            return RepairShopErrors.AccessDenied();
        
        var addResult = await repairShopStorage.AddRepairShopImage(repairShopResult.Value.Id);
        if(addResult.IsFailure)
            return addResult.Error;
        
        return addResult.Value;
    }
}