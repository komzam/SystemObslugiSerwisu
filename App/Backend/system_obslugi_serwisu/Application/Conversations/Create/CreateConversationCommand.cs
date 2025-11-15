using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.Create;

public class CreateConversationCommand : IRequest<OperationResult<Conversation>>
{
    public required Guid CreatorId { get; set; }
    public required Guid ReceiverId { get; set; }
    public required String FirstMessage { get; set; }
    public required ActingRole ActingRole { get; set; }
}