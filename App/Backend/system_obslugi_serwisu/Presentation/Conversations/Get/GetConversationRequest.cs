using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.Conversations.Get;

public class GetConversationRequest
{
    public required Guid ConversationId { get; set; }
    public required ActingRole ActingRole { get; set; }
}