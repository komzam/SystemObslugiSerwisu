namespace system_obslugi_serwisu.Presentation.Conversations.GetList;

public class GetConversationListRequest
{
    public Guid? LastConversationId { get; set; }
    public required int NumberOfConversations { get; set; } 
}