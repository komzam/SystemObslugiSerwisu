using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Presentation.Conversations.Dto;

namespace system_obslugi_serwisu.Presentation.Conversations;

public static class ConversationMapper
{
    public static ConversationDto ToDto(Conversation conversation)
    {
        return new ConversationDto
        {
            Id = conversation.Id.Value,
            RepairShopId = conversation.RepairShopId.Value,
            CustomerId = conversation.CustomerId.Value,
            CreatedAt = conversation.CreatedAt,
        };
    }

    public static MessageDto ToDto(Message message)
    {
        return new MessageDto
        {
            Id = message.Id.Value,
            SenderRole = message.SenderRole,
            Content = message.Content,
            CreatedAt = message.CreatedAt
        };
    }
}