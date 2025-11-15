using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetMessages;

public class GetMessagesCommand : IRequest<OperationResult<CursorPaginatedList<Message,MessageId>>>
{
    public required Guid ConversationId { get; set; }
    public Guid? LastMessageId { get; set; }
    public required int NumberOfMessages { get; set; }
}