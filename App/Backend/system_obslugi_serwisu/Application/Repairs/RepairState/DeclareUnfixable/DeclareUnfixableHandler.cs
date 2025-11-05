using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.DeclareUnfixable;

public class DeclareUnfixableHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeclareUnfixableCommand, OperationResult>
{
    public async Task<OperationResult> Handle(DeclareUnfixableCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        var declareUnfixableResult = await repairResult.Value.DeclareUnfixable(request.Description);
        if(declareUnfixableResult.IsFailure)
            return declareUnfixableResult.Error;

        var finalizeUnfixableResult = await repairResult.Value.FinalizeUnfixable();
        if(finalizeUnfixableResult.IsFailure)
            return finalizeUnfixableResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}