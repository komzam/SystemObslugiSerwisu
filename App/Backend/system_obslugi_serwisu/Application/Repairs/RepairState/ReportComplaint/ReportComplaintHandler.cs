using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ReportComplaint;

public class ReportComplaintHandler(IUnitOfWork unitOfWork) : IRequestHandler<ReportComplaintCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ReportComplaintCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var reportComplaintResult = await repairResult.Value.ReportComplaint();
        if(reportComplaintResult.IsFailure)
            return reportComplaintResult.Error;
        
        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}