
namespace system_obslugi_serwisu.Presentation.Conversations.Dto;

public class ConversationDto
{
    public required Guid Id { get; set; }
    [GraphQLIgnore]
    public required Guid RepairShopId { get; set; }
    [GraphQLIgnore]
    public required Guid CustomerId { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
}