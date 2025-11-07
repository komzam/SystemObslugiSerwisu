using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairFailure;

public class CompleteRepairFailureHandler(IUnitOfWork unitOfWork) : IRequestHandler<CompleteRepairFailureCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CompleteRepairFailureCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;

        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;
        
        var completeRepairFailureResult = await repairResult.Value.CompleteRepairFailure(workerResult.Value, request.Description);
        if(completeRepairFailureResult.IsFailure)
            return completeRepairFailureResult.Error;
        
        var finalizeFailedRepairResult = await repairResult.Value.FinalizeFailedRepair(workerResult.Value);
        if(finalizeFailedRepairResult.IsFailure)
            return finalizeFailedRepairResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}