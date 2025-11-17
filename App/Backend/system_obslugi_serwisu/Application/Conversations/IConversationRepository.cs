using system_obslugi_serwisu.Application.Conversations.GetCustomers;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations;

public interface IConversationRepository
{
    public Task<OperationResult> CreateConversation(Conversation conversation);
    public Task<OperationResult<Conversation>> GetConversation(ConversationId id);
    public Task<OperationResult<CursorPaginatedList<Conversation, ConversationId?>>> GetCustomersConversations(CustomerId customerId, ConversationId? lastConversationId, int numberOfConversations, bool skipEmpty);
    public Task<OperationResult<CursorPaginatedList<Message, MessageId>>> GetMessages(ConversationId conversationId, MessageId? lastMessageId, int numberOfMessages);
}