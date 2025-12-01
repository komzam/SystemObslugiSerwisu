using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.UnassignWorker;

public class UnassignRepairWorkerHandler(IUnitOfWork unitOfWork) : IRequestHandler<UnassignRepairWorkerCommand, OperationResult>
{
    public async Task<OperationResult> Handle(UnassignRepairWorkerCommand request, CancellationToken cancellationToken)
    {
        var requesterResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.RequesterId));
        if(requesterResult.IsFailure)
            return requesterResult.Error;

        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;

        if (repairResult.Value.AssignedWorkerId == null)
            return OperationResult.Success();
        
        var unassignedWorkerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(repairResult.Value.AssignedWorkerId.Value));
        if(unassignedWorkerResult.IsFailure)
            return unassignedWorkerResult.Error;

        var repairUnassingResult = repairResult.Value.UnAssignWorker(requesterResult.Value);
        if (repairUnassingResult.IsFailure)
            return repairUnassingResult.Error;
        
        var workerUnassingResult = unassignedWorkerResult.Value.UnAssignRepair();
        if (workerUnassingResult.IsFailure)
            return workerUnassingResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}