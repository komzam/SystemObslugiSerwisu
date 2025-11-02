using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ResolveComplaint;

public class ResolveComplaintHandler(IUnitOfWork unitOfWork) : IRequestHandler<ResolveComplaintCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ResolveComplaintCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var resolveComplaintResult = await repairResult.Value.ResolveComplaint();
        if(resolveComplaintResult.IsFailure)
            return resolveComplaintResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}