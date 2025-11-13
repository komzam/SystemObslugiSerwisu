using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Users;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Conversations;

public record MessageId(Guid Value);

public class Message
{
    public const int ContentMaxLength = 500;
    
    public MessageId Id { get; private set; }
    public ConversationId ConversationId { get; private set; }
    public UserId SenderId { get; private set; }
    public SenderRole SenderRole { get; private set; }
    public string Content { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    private Message() { }

    private Message(ConversationId conversationId, UserId senderId, SenderRole senderRole, string content)
    {
        Id = new MessageId(Guid.NewGuid());
        ConversationId = conversationId;
        SenderId = senderId;
        SenderRole = senderRole;
        Content = content;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    private static OperationResult ValidateInput(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            return MessageErrors.InvalidContent();
        
        if (content.Length > ContentMaxLength)
            return MessageErrors.ContentTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<Message> Create(ConversationId conversationId, UserId senderId, SenderRole senderRole, string content)
    {
        var validationResult = ValidateInput(content);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new Message(conversationId, senderId, senderRole, content);
    }
}