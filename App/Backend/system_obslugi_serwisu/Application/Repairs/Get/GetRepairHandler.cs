using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.Get;

public class GetRepairHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairCommand, OperationResult<Repair>>
{
    public async Task<OperationResult<Repair>> Handle(GetRepairCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        if (request.ActingRole == ActingRole.Customer)
        {
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.RequesterId));
            if (customerResult.IsFailure)
                return customerResult.Error;

            if (customerResult.Value.Id != repairResult.Value.CustomerId)
                return RepairErrors.AccessDenied();
            
            return repairResult.Value;
        }
        
        if (request.ActingRole == ActingRole.Worker)
        {
            var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.RequesterId));
            if (workerResult.IsFailure)
                return workerResult.Error;
            
            if(!workerResult.Value.IsWorkingAt(repairResult.Value.RepairShopId))
                return RepairErrors.AccessDenied();
            
            return repairResult.Value;
        }
        
        return RepairErrors.AccessDenied();
    }
}