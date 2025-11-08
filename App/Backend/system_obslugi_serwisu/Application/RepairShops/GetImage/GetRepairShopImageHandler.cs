using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.GetImage;

public class GetRepairShopImageHandler(IRepairShopStorageService repairShopStorageService) : IRequestHandler<GetRepairShopImageCommand, OperationResult<string>>
{
    public async Task<OperationResult<string>> Handle(GetRepairShopImageCommand request, CancellationToken cancellationToken)
    {
       return await repairShopStorageService.GetRepairShopImage(new RepairShopId(request.RepairShopId));
    }
}