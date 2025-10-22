using MediatR;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Application.RepairShops.SearchByName;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.RepairShops.Get;
using system_obslugi_serwisu.Presentation.RepairShops.SearchByName;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops;


[ExtendObjectType(typeof(Query))]
public class RepairShopQueries
{
    public async Task<RepairShopDto> RepairShop([Service] IMediator mediatr,
        GetRepairShopRequest request)
    {
        if (!Guid.TryParse(request.Id, out var repairShopId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair shop id")
                .SetCode("BadGuid")
                .Build());
        
        var repairShopResult = await mediatr.Send(new GetRepairShopCommand{
            Id=repairShopId
        });

        if(repairShopResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairShopResult.Error.GetUserMessage())
                .SetCode(repairShopResult.Error.GetUserCode())
                .Build());

        return RepairShopMapper.ToDto(repairShopResult.Value);
    }

    public async Task<PaginatedList<RepairShopDto>> SearchShopsByName([Service] IMediator mediatr, SearchByNameRequest request)
    {
        var shopsListResult = await mediatr.Send(new SearchShopsByNameCommand { Name = request.Name ,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize});
        
        if(shopsListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(shopsListResult.Error.GetUserMessage())
                .SetCode(shopsListResult.Error.GetUserCode())
                .Build());

        return shopsListResult.Value.Map<RepairShopDto>(repairShop => RepairShopMapper.ToDto(repairShop));
    }
}