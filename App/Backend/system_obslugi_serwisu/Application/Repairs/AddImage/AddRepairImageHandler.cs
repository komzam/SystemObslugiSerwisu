using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.RepairShops.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Shared.Errors;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.AddImage;

public class AddRepairImageHandler(IRepairStorageService repairStorage, IUnitOfWork unitOfWork) : IRequestHandler<AddRepairImageCommand, OperationResult<string>>
{
    public async Task<OperationResult<string>> Handle(AddRepairImageCommand request, CancellationToken cancellationToken)
    {
        if (!ContentTypes.Images.Contains(request.ContentType))
        {
            return ContentTypeErrors.TypeNotPermitted();
        }
        
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;

        if (!workerResult.Value.IsWorkingAt(repairResult.Value.RepairShopId))
            return RepairShopErrors.AccessDenied();

        if (repairResult.Value.IsClosed)
            return RepairErrors.RepairClosed();
        
        RepairImage image = RepairImage.Create(repairResult.Value.Id);

        var addResult = await repairStorage.AddRepairImage(image, request.ContentType);
        if(addResult.IsFailure)
            return addResult.Error;
        
        return addResult.Value;
    }
}