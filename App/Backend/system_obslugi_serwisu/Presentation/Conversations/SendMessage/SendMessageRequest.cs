using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.Conversations.SendMessage;

public class SendMessageRequest
{
    public required Guid ConversationId { get; set; }
    public required String Message { get; set; }
    public required ActingRole ActingRole { get; set; }
}