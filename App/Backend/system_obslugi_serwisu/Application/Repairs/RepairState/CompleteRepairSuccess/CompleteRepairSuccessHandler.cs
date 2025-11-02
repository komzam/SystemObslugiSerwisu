using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairSuccess;

public class CompleteRepairSuccessHandler(IUnitOfWork unitOfWork) : IRequestHandler<CompleteRepairSuccessCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CompleteRepairSuccessCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var completeRepairSuccess = await repairResult.Value.CompleteRepairSuccess();
        if(completeRepairSuccess.IsFailure)
            return completeRepairSuccess.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}