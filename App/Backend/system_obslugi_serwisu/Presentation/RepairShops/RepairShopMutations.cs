using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.RepairShops.AddImage;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Presentation.RepairShops.Get;

namespace system_obslugi_serwisu.Presentation.RepairShops;

[ExtendObjectType(typeof(Mutation))]
public class RepairShopMutations
{
    [Authorize]
    public async Task<bool> AddRepairShopImage([Service] IMediator mediatr, Guid repairShopId)
    {
        var repairShopResult = await mediatr.Send(new AddRepairShopImageCommand{
            RepairShopId= repairShopId
        });

        if(repairShopResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairShopResult.Error.GetUserMessage())
                .SetCode(repairShopResult.Error.GetUserCode())
                .Build());

        return true;
    }
}