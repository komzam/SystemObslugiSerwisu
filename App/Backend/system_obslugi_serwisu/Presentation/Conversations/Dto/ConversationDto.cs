
using system_obslugi_serwisu.Domain.Conversations;

namespace system_obslugi_serwisu.Presentation.Conversations.Dto;

public class ConversationDto
{
    public required Guid Id { get; set; }
    [GraphQLIgnore]
    public required Guid RepairShopId { get; set; }
    [GraphQLIgnore]
    public required Guid CustomerId { get; set; }
    [GraphQLIgnore]
    public required Guid? RepairId { get; set; }
    public required ConversationType ConversationType { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
    public required DateTimeOffset ModifiedAt { get; set; }
}