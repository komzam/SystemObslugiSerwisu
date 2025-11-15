using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.SendMessage;

public class SendMessageCommand : IRequest<OperationResult<Message>>
{
    public required Guid ConversationId { get; set; }
    public required Guid SenderId { get; set; }
    public required String Message { get; set; }
    public required ActingRole ActingRole { get; set; }
}