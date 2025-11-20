using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.GetImage;

public class GetRepairShopImageHandler(IUnitOfWork unitOfWork, IRepairShopStorageService repairShopStorageService) : IRequestHandler<GetRepairShopImageCommand, OperationResult<ImageDto>>
{
    public async Task<OperationResult<ImageDto>> Handle(GetRepairShopImageCommand request, CancellationToken cancellationToken)
    {
        var imageResult = await unitOfWork.ImageRepository.GetRepairShopImage(new RepairShopId(request.RepairShopId), request.ImageType);
        if (imageResult.IsFailure)
            return imageResult.Error;
        
        return await repairShopStorageService.GetRepairShopImage(imageResult.Value);
    }
}