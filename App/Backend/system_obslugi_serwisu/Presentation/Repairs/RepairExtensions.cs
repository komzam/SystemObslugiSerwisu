using MediatR;
using system_obslugi_serwisu.Application.Repairs.GetCustomers;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.GetList;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs;

[ExtendObjectType(typeof(RepairDto))]
public class RepairExtensions
{
    public async Task<RepairShopDto> GetRepairShop([Service] IMediator mediatr, [Parent] RepairDto repair)
    {
        var repairShopResult = await mediatr.Send(new GetRepairShopCommand{Id = repair.RepairShopId});
        if(repairShopResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairShopResult.Error.GetUserMessage())
                .SetCode(repairShopResult.Error.GetUserCode())
                .Build());

        return RepairShopMapper.ToDto(repairShopResult.Value);
    }
}