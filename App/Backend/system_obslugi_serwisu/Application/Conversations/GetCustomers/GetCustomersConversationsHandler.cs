using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetCustomers;

public class GetCustomersConversationsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetCustomersConversationsCommand, OperationResult<CursorPaginatedList<Conversation, ConversationId?>>>
{
    public async Task<OperationResult<CursorPaginatedList<Conversation, ConversationId?>>> Handle(GetCustomersConversationsCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;

        ConversationId? lastConversationId = request.LastConversationId!=null ? new ConversationId(request.LastConversationId.Value): null;
        
        var conversationListResult =
            await unitOfWork.ConversationRepository.GetCustomersConversations(customerResult.Value.Id,
                lastConversationId, request.NumberOfConversations, true);
        if(conversationListResult.IsFailure)
            return conversationListResult.Error;
        
        return conversationListResult.Value;
    }
}