using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.PaymentCompleted;

public class PaymentCompletedHandler(IUnitOfWork unitOfWork) : IRequestHandler<PaymentCompletedCommand, OperationResult>
{
    public async Task<OperationResult> Handle(PaymentCompletedCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(request.RepairId);
        if(repairResult.IsFailure)
            return repairResult.Error;

        var paymentCompletedResult = await repairResult.Value.PaymentCompleted();
        if(paymentCompletedResult.IsFailure)
            return paymentCompletedResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}