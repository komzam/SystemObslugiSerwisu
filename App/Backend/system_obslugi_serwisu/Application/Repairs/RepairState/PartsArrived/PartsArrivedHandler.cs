using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.PartsArrived;

public class PartsArrivedHandler(IUnitOfWork unitOfWork) : IRequestHandler<PartsArrivedCommand, OperationResult>
{
    public async Task<OperationResult> Handle(PartsArrivedCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var partsArrivedResult = await repairResult.Value.PartsArrived();
        if(partsArrivedResult.IsFailure)
            return partsArrivedResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}