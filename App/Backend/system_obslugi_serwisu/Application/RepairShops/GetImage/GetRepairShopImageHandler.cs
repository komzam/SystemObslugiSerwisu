using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.GetImage;

public class GetRepairShopImageHandler(IRepairShopStorageService repairShopStorageService) : IRequestHandler<GetRepairShopImageCommand, OperationResult<Image>>
{
    public async Task<OperationResult<Image>> Handle(GetRepairShopImageCommand request, CancellationToken cancellationToken)
    {
       return await repairShopStorageService.GetRepairShopImage(new RepairShopId(request.RepairShopId));
    }
}