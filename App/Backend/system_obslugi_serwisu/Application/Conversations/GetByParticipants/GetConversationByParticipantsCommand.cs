using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetByParticipants;

public class GetConversationByParticipantsCommand : IRequest<OperationResult<Conversation>>
{
    public Guid RequesterId { get; init; }
    public Guid RepairShopId { get; set; }
    public Guid CustomerId { get; set; }
    public ActingRole ActingRole { get; set; }
}