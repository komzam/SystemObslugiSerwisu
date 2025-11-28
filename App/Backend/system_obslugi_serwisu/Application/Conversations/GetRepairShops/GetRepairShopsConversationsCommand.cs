using MediatR;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetRepairShops;

public class GetRepairShopsConversationsCommand : IRequest<OperationResult<CursorPaginatedList<Conversation, ConversationId?>>>
{
    public required Guid RepairShopId { get; set; }
    public required Guid WorkerId { get; set; }
    public Guid? LastConversationId { get; set; }
    public required int NumberOfConversations { get; set; }
}