using System.Diagnostics;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.GetMessages;
using system_obslugi_serwisu.Application.Customers.Get;
using system_obslugi_serwisu.Application.Repairs.Get;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.GetMessages;
using system_obslugi_serwisu.Presentation.Customers;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Conversations;

[ExtendObjectType(typeof(ConversationDto))]
public class ConversationExtensions
{
    [Authorize]
    public async Task<CursorPaginatedList<MessageDto, Guid?>> GetMessages([Service] IMediator mediatr, [Parent] ConversationDto conversationDto, GetMessagesRequest request)
    {
        var messagesResult = await mediatr.Send(new GetMessagesCommand
        {
            ConversationId = conversationDto.Id,
            LastMessageId = request.LastMessageId,
            NumberOfMessages = request.NumberOfMessages,
        });
        if(messagesResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(messagesResult.Error.GetUserMessage())
                .SetCode(messagesResult.Error.GetUserCode())
                .Build());
        
        return messagesResult.Value.Map<MessageDto, Guid?>(ConversationMapper.ToDto, id=>id!=null?id.Value:null);
    }
    
    [Authorize]
    public async Task<RepairShopDto?> GetRepairShop([Service] IMediator mediatr, [Parent] ConversationDto conversationDto, RepairShopBatchDataLoader dataLoader)
    {
        return await dataLoader.LoadAsync(conversationDto.RepairShopId);
    }
    
    [Authorize]
    public async Task<RepairDto?> GetRepair([Service] IMediator mediatr, [Parent] ConversationDto conversationDto, RepairBatchDataLoader dataLoader)
    {
        if (conversationDto.RepairId == null || conversationDto.ConversationType != ConversationType.RepairChat)
            return null;
        
        return await dataLoader.LoadAsync(conversationDto.RepairId.Value);
    }
    
    [Authorize]
    public async Task<CustomerDto?> GetCustomer([Service] IMediator mediatr, [Parent] ConversationDto conversationDto, CustomerBatchDataLoader dataLoader)
    {
        return await dataLoader.LoadAsync(conversationDto.CustomerId);
    }
}