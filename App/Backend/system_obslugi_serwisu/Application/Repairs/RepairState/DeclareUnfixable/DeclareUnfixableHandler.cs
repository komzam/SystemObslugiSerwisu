using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.DeclareUnfixable;

public class DeclareUnfixableHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeclareUnfixableCommand, OperationResult>
{
    public async Task<OperationResult> Handle(DeclareUnfixableCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        var repairShopResult = await unitOfWork.RepairShopRepository.Get(repairResult.Value.RepairShopId);
        if(repairShopResult.IsFailure)
            return repairShopResult.Error;
        
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;
        
        var declareUnfixableResult = await repairResult.Value.DeclareUnfixable(workerResult.Value, request.Description);
        if(declareUnfixableResult.IsFailure)
            return declareUnfixableResult.Error;

        var finalizeUnfixableResult = await repairResult.Value.FinalizeUnfixable(workerResult.Value, repairShopResult.Value.DiagnosisFee);
        if(finalizeUnfixableResult.IsFailure)
            return finalizeUnfixableResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}