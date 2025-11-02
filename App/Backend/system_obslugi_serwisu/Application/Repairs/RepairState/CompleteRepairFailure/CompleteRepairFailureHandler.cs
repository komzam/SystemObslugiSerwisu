using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairFailure;

public class CompleteRepairFailureHandler(IUnitOfWork unitOfWork) : IRequestHandler<CompleteRepairFailureCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CompleteRepairFailureCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var completeRepairFailureResult = await repairResult.Value.CompleteRepairFailure();
        if(completeRepairFailureResult.IsFailure)
            return completeRepairFailureResult.Error;
        
        var finalizeFailedRepairResult = await repairResult.Value.FinalizeFailedRepair();
        if(finalizeFailedRepairResult.IsFailure)
            return finalizeFailedRepairResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}