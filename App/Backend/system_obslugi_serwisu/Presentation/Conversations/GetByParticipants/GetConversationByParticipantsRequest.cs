using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.Conversations.GetByParticipants;

public class GetConversationByParticipantsRequest
{
    public required Guid RepairShopId { get; set; }
    public required Guid CustomerId { get; set; }
    public required ActingRole ActingRole { get; set; }
}