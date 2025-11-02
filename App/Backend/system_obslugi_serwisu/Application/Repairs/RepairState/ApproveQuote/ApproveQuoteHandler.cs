using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ApproveQuote;

public class ApproveQuoteHandler(IUnitOfWork unitOfWork) : IRequestHandler<ApproveQuoteCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ApproveQuoteCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if (repairResult.IsFailure)
            return repairResult.Error;

        var approveQuoteResult = await repairResult.Value.ApproveQuote();
        if(approveQuoteResult.IsFailure)
            return approveQuoteResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}