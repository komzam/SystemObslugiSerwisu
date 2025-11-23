using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.Get;
using system_obslugi_serwisu.Application.Conversations.GetByParticipants;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.Get;
using system_obslugi_serwisu.Presentation.Conversations.GetByParticipants;
using system_obslugi_serwisu.Presentation.Middleware;

namespace system_obslugi_serwisu.Presentation.Conversations;

[ExtendObjectType(typeof(Query))]
public class ConversationQueries
{
    [Authorize]
    [ActingRoleMiddleware]
    public async Task<ConversationDto> GetConversation(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        IResolverContext resolverContext,
        GetConversationRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        
        var conversationResult = await mediatr.Send(new GetConversationCommand
        {
            ConversationId = request.ConversationId,
            RequesterId = userId,
            ActingRole = role
        });
        if(conversationResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationResult.Error.GetUserMessage())
                .SetCode(conversationResult.Error.GetUserCode())
                .Build());
        
        return ConversationMapper.ToDto(conversationResult.Value);
    }
    
    [Authorize]
    [ActingRoleMiddleware]
    public async Task<ConversationDto> GetConversationByParticipants(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        IResolverContext resolverContext,
        GetConversationByParticipantsRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        
        var conversationResult = await mediatr.Send(new GetConversationByParticipantsCommand
        {
            RequesterId = userId,
            CustomerId = request.CustomerId,
            RepairShopId = request.RepairShopId,
            ActingRole = role
        });
        if(conversationResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationResult.Error.GetUserMessage())
                .SetCode(conversationResult.Error.GetUserCode())
                .Build());
        
        return ConversationMapper.ToDto(conversationResult.Value);
    }
}