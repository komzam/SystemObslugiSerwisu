using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.Create;
using system_obslugi_serwisu.Application.Conversations.SendMessage;
using system_obslugi_serwisu.Presentation.Conversations.Create;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.SendMessage;

namespace system_obslugi_serwisu.Presentation.Conversations;

[ExtendObjectType(typeof(Mutation))]
public class ConversationMutations
{
    [Authorize]
    public async Task<ConversationDto> CreateConversation([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, CreateConversationRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var conversationResult = await mediatr.Send(new CreateConversationCommand
        {
            CreatorId = userId,
            ReceiverId = request.ReceiverId,
            FirstMessage = request.FirstMessage,
            ActingRole = request.ActingRole
        });
        if(conversationResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationResult.Error.GetUserMessage())
                .SetCode(conversationResult.Error.GetUserCode())
                .Build());
        
        return ConversationMapper.ToDto(conversationResult.Value);
    }
    
    [Authorize]
    public async Task<bool> SendMessage([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, SendMessageRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var conversationResult = await mediatr.Send(new SendMessageCommand
        {
            ConversationId = request.ConversationId,
            SenderId = userId,
            Message = request.Message,
            ActingRole = request.ActingRole
        });
        if(conversationResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationResult.Error.GetUserMessage())
                .SetCode(conversationResult.Error.GetUserCode())
                .Build());
        
        return true;
    }
}