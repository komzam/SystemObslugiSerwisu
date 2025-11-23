using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using MediatR;
using system_obslugi_serwisu.Application.Customers.Get;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Application.Workers.Get;
using system_obslugi_serwisu.Presentation.Auth.Dto;
using system_obslugi_serwisu.Presentation.Customers;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.Workers;

namespace system_obslugi_serwisu.Presentation.Auth;

[ExtendObjectType(typeof(Query))]
public class AuthQueries
{
    [Authorize]
    [ActingRoleMiddleware]
    public async Task<IMeResult> Me([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, IResolverContext resolverContext)
    {
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());

        if (role == ActingRole.Customer)
        {
            var customerResult = await mediatr.Send(new GetCustomerCommand
            {
                Id = userId
            });
            if (customerResult.IsFailure)
                throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage(customerResult.Error.GetUserMessage())
                    .SetCode(customerResult.Error.GetUserCode())
                    .Build());

            return CustomerMapper.ToFullDto(customerResult.Value);
        }
        
        if(role == ActingRole.Worker)
        {
            var workerResult = await mediatr.Send(new GetWorkerCommand
            {
                WorkerId = userId
            });
            if (workerResult.IsFailure)
                throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage(workerResult.Error.GetUserMessage())
                    .SetCode(workerResult.Error.GetUserCode())
                    .Build());

            return WorkerMapper.ToFullDto(workerResult.Value);
        }
        
        throw new GraphQLException(ErrorBuilder.New()
            .SetMessage("Invalid acting type")
            .SetCode("InvalidActingType")
            .Build());
    }
}