using MediatR;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetCustomers;

public class GetCustomersConversationsCommand : IRequest<OperationResult<CursorPaginatedList<Conversation, ConversationId?>>>
{
    public required Guid CustomerId { get; set; }
    public  Guid? LastConversationId { get; set; }
    public required int NumberOfConversations { get; set; }
}