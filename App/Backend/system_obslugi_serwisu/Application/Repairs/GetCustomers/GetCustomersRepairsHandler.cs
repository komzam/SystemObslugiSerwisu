using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetCustomers;

public class GetCustomersRepairsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetCustomersRepairsCommand, OperationResult<PaginatedList<Repair>>>
{
    public async Task<OperationResult<PaginatedList<Repair>>> Handle(GetCustomersRepairsCommand request, CancellationToken cancellationToken)
    {
        var repairListResult = await unitOfWork.RepairRepository.GetCustomersRepairs(request.CustomerId, request.PageNumber, request.PageSize);
        if(repairListResult.IsFailure)
            return repairListResult.Error;
        
        return repairListResult.Value;
    }
}