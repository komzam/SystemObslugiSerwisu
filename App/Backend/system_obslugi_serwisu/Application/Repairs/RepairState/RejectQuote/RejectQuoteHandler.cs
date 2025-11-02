using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.RejectQuote;

public class RejectQuoteHandler(IUnitOfWork unitOfWork): IRequestHandler<RejectQuoteCommand, OperationResult>
{
    public async Task<OperationResult> Handle(RejectQuoteCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var rejectQuoteResult = await repairResult.Value.RejectQuote();
        if(rejectQuoteResult.IsFailure)
            return rejectQuoteResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}