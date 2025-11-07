using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ReportComplaint;

public class ReportComplaintHandler(IUnitOfWork unitOfWork) : IRequestHandler<ReportComplaintCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ReportComplaintCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if(customerResult.IsFailure)
            return customerResult.Error;

        var reportComplaintResult = await repairResult.Value.ReportComplaint(customerResult.Value);
        if(reportComplaintResult.IsFailure)
            return reportComplaintResult.Error;
        
        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}