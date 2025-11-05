using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CheckInAndQueue;

public class CheckInAndQueueHandler(IUnitOfWork unitOfWork) : IRequestHandler<CheckInAndQueueCommand, OperationResult>
{
    public async Task<OperationResult> Handle(CheckInAndQueueCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if (repairResult.IsFailure)
            return repairResult.Error;

        var checkInResult = await repairResult.Value.CheckIn(request.Description);
        if(checkInResult.IsFailure)
            return checkInResult.Error;
        
        var queueForDiagnosisResult = await repairResult.Value.QueueForDiagnosis();
        if(queueForDiagnosisResult.IsFailure)
            return queueForDiagnosisResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}