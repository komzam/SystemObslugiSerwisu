using system_obslugi_serwisu.Domain.Conversations;

namespace system_obslugi_serwisu.Presentation.Conversations.Dto;

public class MessageDto
{
    public required Guid Id { get; set; }
    public required SenderRole SenderRole { get; set; }
    public required string Content { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
}