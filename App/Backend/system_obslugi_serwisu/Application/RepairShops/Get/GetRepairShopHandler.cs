using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.Get;

public class GetRepairShopHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairShopCommand, OperationResult<RepairShop>>
{
    public async Task<OperationResult<RepairShop>> Handle(GetRepairShopCommand request, CancellationToken cancellationToken)
    {
        var repairShopResult = await unitOfWork.RepairShopRepository.Get(request.Id);
        if (repairShopResult.IsFailure)
            return repairShopResult.Error;
        
        return repairShopResult.Value;
    }
}