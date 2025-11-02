using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.Cancel;

public class CancelHandler(IUnitOfWork unitOfWork) : IRequestHandler<CancelCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CancelCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var cancelResult = await repairResult.Value.Cancel();
        if(cancelResult.IsFailure)
            return cancelResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}