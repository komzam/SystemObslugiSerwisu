using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.Get;

public class GetConversationCommand : IRequest<OperationResult<Conversation>>
{
    public required Guid RequesterId { get; set; }
    public required Guid ConversationId { get; set; }
    public required ActingRole ActingRole { get; set; }
}