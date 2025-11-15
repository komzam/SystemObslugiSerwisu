using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.Get;

public class GetConversationHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetConversationCommand, OperationResult<Conversation>>
{
    public async Task<OperationResult<Conversation>> Handle(GetConversationCommand request, CancellationToken cancellationToken)
    {
        var conversationResult = await unitOfWork.ConversationRepository
            .GetConversation(new ConversationId(request.ConversationId));
        
        if(conversationResult.IsFailure)
            return conversationResult.Error;
        
        if (request.ActingRole == ActingRole.Customer)
        {
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.RequesterId));
            if (customerResult.IsFailure)
                return customerResult.Error;

            if (customerResult.Value.Id != conversationResult.Value.CustomerId)
                return ConversationErrors.AccessDenied();
            
            return conversationResult.Value;
        }
        
        if (request.ActingRole == ActingRole.Worker)
        {
            var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.RequesterId));
            if (workerResult.IsFailure)
                return workerResult.Error;
            
            if(!workerResult.Value.IsWorkingAt(conversationResult.Value.RepairShopId))
                return ConversationErrors.AccessDenied();
            
            return conversationResult.Value;
        }
        
        return ConversationErrors.AccessDenied();
    }
}