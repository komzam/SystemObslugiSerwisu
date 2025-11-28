using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.GetRepairShops;

public class GetRepairShopsConversationsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairShopsConversationsCommand, OperationResult<CursorPaginatedList<Conversation, ConversationId?>>>
{
    public async Task<OperationResult<CursorPaginatedList<Conversation, ConversationId?>>> Handle(GetRepairShopsConversationsCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if(workerResult.IsFailure)
            return workerResult.Error;
        
        var repairShopResult = await unitOfWork.RepairShopRepository.Get(new RepairShopId(request.RepairShopId));
        if(repairShopResult.IsFailure)
            return repairShopResult.Error;

        if (!workerResult.Value.IsWorkingAt(repairShopResult.Value.Id))
            return ConversationErrors.AccessDenied();
        
        ConversationId? lastConversationId = request.LastConversationId!=null ? new ConversationId(request.LastConversationId.Value): null;
        
        var conversationListResult =
            await unitOfWork.ConversationRepository.GetRepairShopsConversations(repairShopResult.Value.Id,
                lastConversationId, request.NumberOfConversations, true);
        if(conversationListResult.IsFailure)
            return conversationListResult.Error;
        
        return conversationListResult.Value;
    }
}