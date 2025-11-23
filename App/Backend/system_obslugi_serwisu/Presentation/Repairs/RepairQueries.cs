using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using MediatR;
using system_obslugi_serwisu.Application.Repairs.Get;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.Get;

namespace system_obslugi_serwisu.Presentation.Repairs;

[ExtendObjectType(typeof(Query))]
public class RepairQueries
{
    
    [Authorize]
    [ActingRoleMiddleware]
    public async Task<RepairDto> Repair(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        IResolverContext resolverContext,
        GetRepairRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        var repairResult = await mediatr.Send(new GetRepairCommand{
            RepairId= request.RepairId,
            RequesterId = userId,
            ActingRole = role
        });

        if(repairResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairResult.Error.GetUserMessage())
                .SetCode(repairResult.Error.GetUserCode())
                .Build());

        return RepairMapper.ToDto(repairResult.Value);
    }
}