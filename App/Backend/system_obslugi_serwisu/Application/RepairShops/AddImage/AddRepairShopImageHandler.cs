using MediatR;
using system_obslugi_serwisu.Application.ImageQueue;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.AddImage;

public class AddRepairShopImageHandler(IRepairShopStorageService repairShopStorage, IImageQueue imageQueue) : IRequestHandler<AddRepairShopImageCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AddRepairShopImageCommand request, CancellationToken cancellationToken)
    {
        var addResult = await repairShopStorage.AddRepairShopImage(new RepairShopId(request.RepairShopId));
        if(addResult.IsFailure)
            return addResult.Error;
        
        return OperationResult.Success();
    }
}