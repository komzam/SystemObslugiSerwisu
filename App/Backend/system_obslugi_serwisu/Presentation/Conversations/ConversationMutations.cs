using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Subscriptions;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.Create;
using system_obslugi_serwisu.Application.Conversations.Get;
using system_obslugi_serwisu.Application.Conversations.SendMessage;
using system_obslugi_serwisu.Presentation.Conversations.Create;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.SendMessage;

namespace system_obslugi_serwisu.Presentation.Conversations;

[ExtendObjectType(typeof(Mutation))]
public class ConversationMutations
{
    [Authorize]
    public async Task<ConversationDto> CreateConversation(
        [Service] IMediator mediatr,
        [Service] ITopicEventSender eventSender,
        ClaimsPrincipal claimsPrincipal,
        CreateConversationRequest request,
        CancellationToken cancellationToken)
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
        }, cancellationToken);
        if(conversationResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationResult.Error.GetUserMessage())
                .SetCode(conversationResult.Error.GetUserCode())
                .Build());

        var conversation = ConversationMapper.ToDto(conversationResult.Value);

        await eventSender.SendAsync(
            $"RepairShop_{conversation.RepairShopId}_Conversations",
            conversation,
            cancellationToken);
        
        await eventSender.SendAsync(
            $"Customer_{conversation.CustomerId}_Conversations",
            conversation,
            cancellationToken);
        
        return conversation;
    }

    [Authorize]
    public async Task<bool> SendMessage([Service] IMediator mediatr,
        [Service] ITopicEventSender eventSender,
        ClaimsPrincipal claimsPrincipal,
        SendMessageRequest request,
        CancellationToken cancellationToken)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());

        var sendMessageResult = await mediatr.Send(new SendMessageCommand
        {
            ConversationId = request.ConversationId,
            SenderId = userId,
            Message = request.Message,
            ActingRole = request.ActingRole
        });
        if (sendMessageResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(sendMessageResult.Error.GetUserMessage())
                .SetCode(sendMessageResult.Error.GetUserCode())
                .Build());

        await eventSender.SendAsync(sendMessageResult.Value.ConversationId.Value.ToString(),
            ConversationMapper.ToDto(sendMessageResult.Value),
            cancellationToken);

        var conversationResult = await mediatr.Send(new GetConversationCommand
        {
            ConversationId = request.ConversationId,
            ActingRole = request.ActingRole,
            RequesterId = userId
        });
        if (conversationResult.IsSuccess){
            var conversation = ConversationMapper.ToDto(conversationResult.Value);
            await eventSender.SendAsync(
                $"RepairShop_{conversation.RepairShopId}_Conversations",
                conversation,
                cancellationToken);

            await eventSender.SendAsync(
                $"Customer_{conversation.CustomerId}_Conversations",
                conversation,
                cancellationToken);
        }
    return true;
    }
}