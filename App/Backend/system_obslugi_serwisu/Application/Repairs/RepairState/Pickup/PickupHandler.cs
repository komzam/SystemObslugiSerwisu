using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.Pickup;

public class PickupHandler(IUnitOfWork unitOfWork) : IRequestHandler<PickupCommand, OperationResult>
{
    public async Task<OperationResult> Handle(PickupCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var pickupResult = await repairResult.Value.Pickup();
        if(pickupResult.IsFailure)
            return pickupResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}