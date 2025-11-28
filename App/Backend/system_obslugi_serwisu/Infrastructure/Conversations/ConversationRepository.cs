using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Conversations;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Conversations;

public class ConversationRepository(DatabaseContext databaseContext) : IConversationRepository
{
    public async Task<OperationResult> CreateConversation(Conversation conversation)
    {
        try
        {
            await databaseContext.Conversations.AddAsync(conversation);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }

    public async Task<OperationResult<Conversation>> GetConversation(ConversationId id)
    {
        Conversation? conversation;
        
        try
        {
            conversation = await databaseContext.Conversations.FirstOrDefaultAsync(c => c.Id == id);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }

        if (conversation == null)
            return ConversationErrors.ConversationNotFound();
        
        return conversation;
    }

    public async Task<OperationResult<List<Conversation>>> GetConversation(RepairShopId repairShopId, CustomerId customerId, ConversationType conversationType)
    {
        List<Conversation> conversations;

        try
        {
            conversations = await databaseContext.Conversations
                .Where(conversation => conversation.RepairShopId == repairShopId)
                .Where(conversation => conversation.CustomerId == customerId)
                .Where(conversation => conversation.ConversationType == conversationType)
                .ToListAsync();
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }

        return conversations;
    }

    public async Task<OperationResult<CursorPaginatedList<Conversation, ConversationId?>>> GetCustomersConversations(
        CustomerId customerId,
        ConversationId? lastConversationId,
        int numberOfConversations,
        bool skipEmpty)
    {
        List<Conversation> conversations;
        ConversationId? newLastConversationId;
        bool hasMore;
        
        try
        {
            var conversationsQuery = databaseContext.Conversations
                .Where(conversation => conversation.CustomerId == customerId);

            if (lastConversationId != null)
            {
                var lastConversation = await databaseContext.Conversations.FirstOrDefaultAsync(c => c.Id == lastConversationId);
                if (lastConversation != null)
                    conversationsQuery = conversationsQuery.Where(c => c.LastModifiedAt < lastConversation.LastModifiedAt);
            }

            if (skipEmpty)
            {
                conversationsQuery = conversationsQuery.Where(c => c.Messages.Any());
            }

            conversations = await conversationsQuery
                .OrderByDescending(conversation => conversation.LastModifiedAt)
                .Take(numberOfConversations+1)
                .ToListAsync();
            
            hasMore = conversations.Count > numberOfConversations;
            
            conversations = conversations.Take(numberOfConversations).ToList();

            newLastConversationId = conversations.Count != 0 ? conversations.Last().Id : null;
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new CursorPaginatedList<Conversation, ConversationId?>
        {
            Items = conversations,
            LastItemId = newLastConversationId,
            HasMore = hasMore
        };
    }

    public async Task<OperationResult<CursorPaginatedList<Conversation, ConversationId?>>> GetRepairShopsConversations(RepairShopId repairShopId, ConversationId? lastConversationId,
        int numberOfConversations, bool skipEmpty)
    {
        List<Conversation> conversations;
        ConversationId? newLastConversationId;
        bool hasMore;
        
        try
        {
            var conversationsQuery = databaseContext.Conversations
                .Where(conversation => conversation.RepairShopId == repairShopId);

            if (lastConversationId != null)
            {
                var lastConversation = await databaseContext.Conversations.FirstOrDefaultAsync(c => c.Id == lastConversationId);
                if (lastConversation != null)
                    conversationsQuery = conversationsQuery.Where(c => c.LastModifiedAt < lastConversation.LastModifiedAt);
            }

            if (skipEmpty)
            {
                conversationsQuery = conversationsQuery.Where(c => c.Messages.Any());
            }

            conversations = await conversationsQuery
                .OrderByDescending(conversation => conversation.LastModifiedAt)
                .Take(numberOfConversations+1)
                .ToListAsync();
            
            hasMore = conversations.Count > numberOfConversations;
            
            conversations = conversations.Take(numberOfConversations).ToList();

            newLastConversationId = conversations.Count != 0 ? conversations.Last().Id : null;
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new CursorPaginatedList<Conversation, ConversationId?>
        {
            Items = conversations,
            LastItemId = newLastConversationId,
            HasMore = hasMore
        };
    }

    public async Task<OperationResult<CursorPaginatedList<Message, MessageId>>> GetMessages(ConversationId conversationId, MessageId? lastMessageId, int numberOfMessages)
    {
        List<Message> messages;
        MessageId? newLastMessageId;
        bool hasMore;
        
        try
        {
            var messagesQuery = databaseContext.Messages
                .Where(message => message.ConversationId == conversationId);

            if (lastMessageId != null)
            {
                var lastMessage = await databaseContext.Messages.FirstOrDefaultAsync(m => m.Id == lastMessageId);
                if (lastMessage != null)
                    messagesQuery = messagesQuery.Where(m => m.CreatedAt < lastMessage.CreatedAt);
            }

            messages = await messagesQuery
                .OrderByDescending(message => message.CreatedAt)
                .Take(numberOfMessages+1)
                .ToListAsync();
            
            hasMore = messages.Count > numberOfMessages;
            
            messages = messages.Take(numberOfMessages).ToList();

            newLastMessageId = messages.Count != 0 ? messages.Last().Id : null;
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new CursorPaginatedList<Message, MessageId>
        {
            Items = messages,
            LastItemId = newLastMessageId,
            HasMore = hasMore
        };
    }
}