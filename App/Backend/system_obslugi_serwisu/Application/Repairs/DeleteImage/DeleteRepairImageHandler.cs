using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.DeleteImage;

public class DeleteRepairImageHandler(IUnitOfWork unitOfWork, IRepairStorageService repairStorageService) : IRequestHandler<DeleteRepairImageCommand, OperationResult>
{
    public async Task<OperationResult> Handle(DeleteRepairImageCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if (workerResult.IsFailure)
            return workerResult.Error;

        var imageResult = await unitOfWork.ImageRepository.GetRepairImage(new ImageId(request.ImageId));
        if (imageResult.IsFailure)
            return imageResult.Error;

        var repairResult = await unitOfWork.RepairRepository.GetRepair(imageResult.Value.RepairId);
        if (repairResult.IsFailure)
            return repairResult.Error;

        if (!workerResult.Value.IsWorkingAt(repairResult.Value.RepairShopId))
            return RepairErrors.AccessDenied();

        var deleteResult = await unitOfWork.ImageRepository.DeleteImage(imageResult.Value.ImageId);
        if(deleteResult.IsFailure)
            return deleteResult.Error;
        
        var deleteFromStorageResult = await repairStorageService.DeleteRepairImage(imageResult.Value);
        if (deleteFromStorageResult.IsFailure)
            return deleteFromStorageResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}