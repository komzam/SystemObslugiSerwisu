using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.StartRepair;

public class StartRepairHandler(IUnitOfWork unitOfWork) : IRequestHandler<StartRepairCommand, OperationResult>
{
    public async Task<OperationResult> Handle(StartRepairCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if (repairResult.IsFailure)
            return repairResult.Error;
        
        var startRepairResult = await repairResult.Value.StartRepair();
        if(startRepairResult.IsFailure)
            return startRepairResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}