using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetMessages;

public class GetMessagesHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetMessagesCommand, OperationResult<CursorPaginatedList<Message,MessageId>>>
{
    public async Task<OperationResult<CursorPaginatedList<Message,MessageId>>> Handle(GetMessagesCommand request, CancellationToken cancellationToken)
    {
        MessageId? lastMessageId = request.LastMessageId != null ? new MessageId(request.LastMessageId.Value) : null;
        
        var messagesListResult = await unitOfWork.ConversationRepository
            .GetMessages(new ConversationId(request.ConversationId), lastMessageId, request.NumberOfMessages);
        
        if(messagesListResult.IsFailure)
            return messagesListResult.Error;
        
        return messagesListResult.Value;
    }
}