using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.StartDiagnosis;

public class StartDiagnosisHandler(IUnitOfWork unitOfWork) : IRequestHandler<StartDiagnosisCommand, OperationResult>
{
    public async Task<OperationResult> Handle(StartDiagnosisCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if (repairResult.IsFailure)
            return repairResult.Error;
        
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;

        var startDiagnosisResult = await repairResult.Value.StartDiagnosis(workerResult.Value);
        if(startDiagnosisResult.IsFailure)
            return startDiagnosisResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}