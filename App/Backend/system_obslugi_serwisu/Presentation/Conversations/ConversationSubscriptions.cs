using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.Get;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Presentation.Conversations.Dto;

namespace system_obslugi_serwisu.Presentation.Conversations;

[ExtendObjectType(typeof(Subscription))]
public class ConversationSubscriptions
{
    [Topic($"{{{nameof(conversationId)}}}")]
    public async ValueTask<ISourceStream<MessageDto>> SubscribeToMessages(
        [Service] IMediator mediatr,
        [Service] ITopicEventReceiver receiver,
        ClaimsPrincipal claimsPrincipal,
        Guid conversationId,
        ActingRole actingRole,
        CancellationToken cancellationToken)
    { 
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var conversationResult = await mediatr.Send(new GetConversationCommand
        {
            ConversationId = conversationId,
            RequesterId = userId,
            ActingRole = actingRole
        }, cancellationToken);
        if(conversationResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationResult.Error.GetUserMessage())
                .SetCode(conversationResult.Error.GetUserCode())
                .Build());
        
        return await receiver.SubscribeAsync<MessageDto>(conversationId.ToString(), cancellationToken);
    }

    [Authorize]
    [Subscribe(With = nameof(SubscribeToMessages))]
    public MessageDto OnMessageSent([EventMessage] MessageDto message)
        => message;
}