using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.Get;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.Get;

namespace system_obslugi_serwisu.Presentation.Conversations;

[ExtendObjectType(typeof(Query))]
public class ConversationQueries
{
    [Authorize]
    public async Task<ConversationDto> GetConversation([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, GetConversationRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var conversationResult = await mediatr.Send(new GetConversationCommand
        {
            ConversationId = request.ConversationId,
            RequesterId = userId,
            ActingRole = request.ActingRole
        });
        if(conversationResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationResult.Error.GetUserMessage())
                .SetCode(conversationResult.Error.GetUserCode())
                .Build());
        
        return ConversationMapper.ToDto(conversationResult.Value);
    }
}