using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.SubmitQuote;

public class SubmitQuoteHandler(IUnitOfWork unitOfWork) : IRequestHandler<SubmitQuoteCommand, OperationResult>
{
    public async Task<OperationResult> Handle(SubmitQuoteCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        var submitQuoteResult = await repairResult.Value.SubmitQuote();
        if(submitQuoteResult.IsFailure)
            return submitQuoteResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}