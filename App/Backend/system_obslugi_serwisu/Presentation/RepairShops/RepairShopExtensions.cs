using MediatR;
using system_obslugi_serwisu.Application.RepairShops.GetImage;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops;

[ExtendObjectType(typeof(RepairShopDto))]
public class RepairShopExtensions
{
    public async Task<Shared.ImageDto?> GetMiniatureImage([Service] IMediator mediatr, [Parent] RepairShopDto repairShop)
    {
        var imageResult = await mediatr.Send(new GetRepairShopImageCommand
        {
            RepairShopId = repairShop.Id,
            ImageType = RepairShopImageType.Miniature
        });
        return imageResult.IsFailure ? null : SharedMapper.ToDto(imageResult.Value);
    }
    
    public async Task<Shared.ImageDto?> GetMainImage([Service] IMediator mediatr, [Parent] RepairShopDto repairShop)
    {
        var imageResult = await mediatr.Send(new GetRepairShopImageCommand
        {
            RepairShopId = repairShop.Id,
            ImageType = RepairShopImageType.Main
        });
        return imageResult.IsFailure ? null : SharedMapper.ToDto(imageResult.Value);
    }
}