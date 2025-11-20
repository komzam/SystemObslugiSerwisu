using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetList;

public class GetRepairListHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairListCommand, OperationResult<List<Repair>>>
{
    public async Task<OperationResult<List<Repair>>> Handle(GetRepairListCommand request, CancellationToken cancellationToken)
    {
        var repairIds = request.RepairIds.Select(id => new RepairId(id)).ToList();
        
        return await unitOfWork.RepairRepository.GetRepairs(repairIds);
    }
}