using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.StartDiagnosis;

public class StartDiagnosisHandler(IUnitOfWork unitOfWork) : IRequestHandler<StartDiagnosisCommand, OperationResult>
{
    public async Task<OperationResult> Handle(StartDiagnosisCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if (repairResult.IsFailure)
            return repairResult.Error;

        var startDiagnosisResult = await repairResult.Value.StartDiagnosis();
        if(startDiagnosisResult.IsFailure)
            return startDiagnosisResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}