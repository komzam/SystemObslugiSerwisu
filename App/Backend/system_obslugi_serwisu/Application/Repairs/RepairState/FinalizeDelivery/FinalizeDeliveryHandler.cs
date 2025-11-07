using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Users;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.FinalizeDelivery;

public class FinalizeDeliveryHandler(IUnitOfWork unitOfWork) : IRequestHandler<FinalizeDeliveryCommand, OperationResult>
{
    public async Task<OperationResult> Handle(FinalizeDeliveryCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        User user;
        if (request.ActingRole == ActingRole.Customer)
        {
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.UserId));
            if(customerResult.IsFailure)
                return customerResult.Error;
            user = customerResult.Value;
        }
        else if(request.ActingRole == ActingRole.Worker)
        {
            var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.UserId));
            if(workerResult.IsFailure)
                return workerResult.Error;
            user = workerResult.Value;
        }
        else
        {
            return RepairErrors.AccessDenied();
        }

        var finalizeDeliveryResult = await repairResult.Value.FinalizeDelivery(user);
        if(finalizeDeliveryResult.IsFailure)
            return finalizeDeliveryResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}