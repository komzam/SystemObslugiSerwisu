using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.PartsNeeded;

public class PartsNeededHandler(IUnitOfWork unitOfWork) : IRequestHandler<PartsNeededCommand, OperationResult>
{
    public async Task<OperationResult> Handle(PartsNeededCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var partsNeededResult = await repairResult.Value.PartsNeeded();
        if(partsNeededResult.IsFailure)
            return partsNeededResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}