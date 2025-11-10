using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.RepairShops.AddImage;

namespace system_obslugi_serwisu.Presentation.RepairShops;

[ExtendObjectType(typeof(Mutation))]
public class RepairShopMutations
{
    [Authorize]
    public async Task<string> AddRepairShopImage([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, Guid repairShopId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var addImageUrlResult = await mediatr.Send(new AddRepairShopImageCommand{
            RepairShopId= repairShopId,
            WorkerId= workerId
        });

        if(addImageUrlResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(addImageUrlResult.Error.GetUserMessage())
                .SetCode(addImageUrlResult.Error.GetUserCode())
                .Build());

        return addImageUrlResult.Value;
    }
}