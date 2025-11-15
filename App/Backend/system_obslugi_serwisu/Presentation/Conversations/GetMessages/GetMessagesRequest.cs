namespace system_obslugi_serwisu.Presentation.Conversations.GetMessages;

public class GetMessagesRequest
{
    public required Guid? LastMessageId { get; set; }
    public required int NumberOfMessages { get; set; }
}