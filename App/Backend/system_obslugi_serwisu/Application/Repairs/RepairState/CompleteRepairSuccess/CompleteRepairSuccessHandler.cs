using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairSuccess;

public class CompleteRepairSuccessHandler(IUnitOfWork unitOfWork) : IRequestHandler<CompleteRepairSuccessCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CompleteRepairSuccessCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;

        Money? finalCost = null;
        if (request.FinalCostCurrency != null && request.FinalCost != null)
        {
            var finalCostResult = Money.Create(request.FinalCost.Value, request.FinalCostCurrency.Value);
            if (finalCostResult.IsFailure)
                return finalCostResult.Error;
            finalCost = finalCostResult.Value;
        }

        var completeRepairSuccess = await repairResult.Value.CompleteRepairSuccess(workerResult.Value, finalCost, request.Description);
        if(completeRepairSuccess.IsFailure)
            return completeRepairSuccess.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}