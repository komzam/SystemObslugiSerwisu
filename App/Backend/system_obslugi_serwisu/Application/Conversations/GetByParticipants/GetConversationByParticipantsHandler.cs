using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetByParticipants;

public class GetConversationByParticipantsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetConversationByParticipantsCommand, OperationResult<Conversation>>
{
    public async Task<OperationResult<Conversation>> Handle(GetConversationByParticipantsCommand request, CancellationToken cancellationToken)
    {
        if (request.ActingRole == ActingRole.Customer)
        {
            if (request.RequesterId != request.CustomerId)
                return ConversationErrors.AccessDenied();
        }else if (request.ActingRole == ActingRole.Worker)
        {
            var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.RequesterId));
            if(workerResult.IsFailure)
                return workerResult.Error;
            
            if(!workerResult.Value.IsWorkingAt(new RepairShopId(request.RepairShopId)))
                return ConversationErrors.AccessDenied();
        }
        else { return ConversationErrors.AccessDenied();}
        
        var conversationResult = await unitOfWork.ConversationRepository.GetConversation(
            new RepairShopId(request.RepairShopId),
            new CustomerId(request.CustomerId),
            ConversationType.GeneralChat);
        if (conversationResult.IsFailure)
            return conversationResult.Error;

        var conversation = conversationResult.Value.FirstOrDefault();
        if (conversation == null)
            return ConversationErrors.ConversationNotFound();
        
        return conversation;
    }
}