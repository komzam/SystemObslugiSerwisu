using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.Get;

public class GetRepairHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairCommand, OperationResult<Repair>>
{
    public async Task<OperationResult<Repair>> Handle(GetRepairCommand request, CancellationToken cancellationToken)
    {
        var repairResult = await unitOfWork.RepairRepository.GetRepair(new RepairId(request.RepairId));
        if(repairResult.IsFailure)
            return repairResult.Error;
        
        return repairResult.Value;
    }
}