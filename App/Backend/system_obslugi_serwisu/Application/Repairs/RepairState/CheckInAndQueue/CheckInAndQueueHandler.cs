using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CheckInAndQueue;

public class CheckInAndQueueHandler(IUnitOfWork unitOfWork) : IRequestHandler<CheckInAndQueueCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CheckInAndQueueCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if (repairResult.IsFailure)
            return repairResult.Error;
        
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;
        
        var checkInResult = await repairResult.Value.CheckIn(workerResult.Value, request.Description);
        if(checkInResult.IsFailure)
            return checkInResult.Error;
        
        var queueForDiagnosisResult = await repairResult.Value.QueueForDiagnosis(workerResult.Value);
        if(queueForDiagnosisResult.IsFailure)
            return queueForDiagnosisResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}