using MediatR;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Application.RepairShops.GetImage;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops;

[ExtendObjectType(typeof(RepairShopDto))]
public class RepairShopExtensions
{
    public async Task<ImageDto> GetRepairShopImage([Service] IMediator mediatr, [Parent] RepairShopDto repairShop)
    {
        var imageResult = await mediatr.Send(new GetRepairShopImageCommand
        {
            RepairShopId = repairShop.Id
        });
        if(imageResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(imageResult.Error.GetUserMessage())
                .SetCode(imageResult.Error.GetUserCode())
                .Build());

        return SharedMapper.ToDto(imageResult.Value);
    }
}