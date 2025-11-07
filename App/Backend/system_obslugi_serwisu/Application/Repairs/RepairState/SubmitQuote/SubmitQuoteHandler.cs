using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.SubmitQuote;

public class SubmitQuoteHandler(IUnitOfWork unitOfWork) : IRequestHandler<SubmitQuoteCommand, OperationResult>
{
    public async Task<OperationResult> Handle(SubmitQuoteCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;

        var laborCostResult = Money.Create(request.LaborCost, request.Currency);
        if(laborCostResult.IsFailure)
            return laborCostResult.Error;
        
        var partsCostResult = Money.Create(request.PartsCost, request.Currency);
        if(partsCostResult.IsFailure)
            return partsCostResult.Error;
        
        var quoteResult = Quote.Create(laborCostResult.Value, partsCostResult.Value);
        if(quoteResult.IsFailure)
            return quoteResult.Error;
        
        var submitQuoteResult = await repairResult.Value.SubmitQuote(workerResult.Value, quoteResult.Value, request.Description);
        if(submitQuoteResult.IsFailure)
            return submitQuoteResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}