using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.Conversations.Create;

public class CreateConversationRequest
{
    public required Guid ReceiverId { get; set; }
    public required String FirstMessage { get; set; }
}