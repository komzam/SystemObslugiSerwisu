using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.AssignWorker;

public class AssignRepairWorkerHandler(IUnitOfWork unitOfWork): IRequestHandler<AssignRepairWorkerCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AssignRepairWorkerCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if (workerResult.IsFailure)
            return workerResult.Error;

        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if (repairResult.IsFailure)
            return repairResult.Error;
        
        var workerAssignResult = workerResult.Value.AssignRepair(repairResult.Value);
        if(workerAssignResult.IsFailure)
            return workerAssignResult.Error;

        var repairAssignResult = repairResult.Value.AssignWorker(workerResult.Value);
        if(repairAssignResult.IsFailure)
            return repairAssignResult.Error;
        
        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}