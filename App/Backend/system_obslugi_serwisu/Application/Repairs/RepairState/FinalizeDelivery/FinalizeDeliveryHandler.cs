using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.FinalizeDelivery;

public class FinalizeDeliveryHandler(IUnitOfWork unitOfWork) : IRequestHandler<FinalizeDeliveryCommand, OperationResult>
{
    public async Task<OperationResult> Handle(FinalizeDeliveryCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var finalizeDeliveryResult = await repairResult.Value.FinalizeDelivery();
        if(finalizeDeliveryResult.IsFailure)
            return finalizeDeliveryResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}