using MediatR;
using system_obslugi_serwisu.Application.Conversations.GetCustomers;
using system_obslugi_serwisu.Application.Repairs.GetCustomers;
using system_obslugi_serwisu.Presentation.Conversations;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.GetList;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.GetList;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Customers;

[ExtendObjectType(typeof(FullCustomerDto))]
public class CustomerExtensions
{
    public async Task<PaginatedList<RepairDto>> GetRepairs([Service] IMediator mediatr, [Parent] FullCustomerDto customer, GetRepairListRequest request)
    {
        var repairListResult = await mediatr.Send(new GetCustomersRepairsCommand{CustomerId = customer.Id, PageNumber = request.PageNumber, PageSize = request.PageSize});
        if(repairListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairListResult.Error.GetUserMessage())
                .SetCode(repairListResult.Error.GetUserCode())
                .Build());

        return repairListResult.Value.Map<RepairDto>(r => RepairMapper.ToDto(r));
    }
    
    public async Task<CursorPaginatedList<ConversationDto, Guid?>> GetConversations([Service] IMediator mediatr, [Parent] FullCustomerDto customer, GetConversationListRequest request)
    {
        var conversationListResult = await mediatr.Send(new GetCustomersConversationsCommand
        {
            CustomerId = customer.Id,
            LastConversationId = request.LastConversationId,
            NumberOfConversations = request.NumberOfConversations
        });
        if(conversationListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationListResult.Error.GetUserMessage())
                .SetCode(conversationListResult.Error.GetUserCode())
                .Build());

        return conversationListResult.Value.Map(ConversationMapper.ToDto, id=>id?.Value);
    }
}