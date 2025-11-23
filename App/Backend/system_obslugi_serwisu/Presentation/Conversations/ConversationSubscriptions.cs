using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Execution;
using HotChocolate.Resolvers;
using HotChocolate.Subscriptions;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.Get;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Application.Workers.WorksAt;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Middleware;

namespace system_obslugi_serwisu.Presentation.Conversations;

[ExtendObjectType(typeof(Subscription))]
public class ConversationSubscriptions
{
    
    public async ValueTask<ISourceStream<MessageDto>> SubscribeToMessages(
        [Service] IMediator mediatr,
        [Service] ITopicEventReceiver receiver,
        ClaimsPrincipal claimsPrincipal,
        IResolverContext resolverContext,
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
    
    
    public async ValueTask<ISourceStream<ConversationDto>> SubscribeToRepairShopConversations(
        [Service] IMediator mediatr,
        [Service] ITopicEventReceiver receiver,
        ClaimsPrincipal claimsPrincipal,
        Guid repairShopId,
        CancellationToken cancellationToken)
    { 
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var isWorkingThereResult = await mediatr.Send(new WorkerWorksAtCommand
        {
            RepairShopId = repairShopId,
            WorkerId = userId
        }, cancellationToken);
        if(isWorkingThereResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(isWorkingThereResult.Error.GetUserMessage())
                .SetCode(isWorkingThereResult.Error.GetUserCode())
                .Build());
        
        return await receiver.SubscribeAsync<ConversationDto>($"RepairShop_{repairShopId}_Conversations", cancellationToken);
    }

    [Authorize]
    [Subscribe(With = nameof(SubscribeToRepairShopConversations))]
    public ConversationDto OnRepairShopConversationsUpdated([EventMessage] ConversationDto conversation)
        => conversation;
    
    public async ValueTask<ISourceStream<ConversationDto>> SubscribeToCustomerConversations(
        [Service] IMediator mediatr,
        [Service] ITopicEventReceiver receiver,
        ClaimsPrincipal claimsPrincipal,
        CancellationToken cancellationToken)
    { 
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        return await receiver.SubscribeAsync<ConversationDto>($"Customer_{customerId}_Conversations", cancellationToken);
    }

    [Authorize]
    [Subscribe(With = nameof(SubscribeToCustomerConversations))]
    public ConversationDto OnCustomerConversationsUpdated([EventMessage] ConversationDto conversation)
        => conversation;
}