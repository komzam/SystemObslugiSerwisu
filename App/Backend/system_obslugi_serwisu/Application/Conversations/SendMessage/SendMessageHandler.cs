using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Users;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.SendMessage;

public class SendMessageHandler(IUnitOfWork unitOfWork) : IRequestHandler<SendMessageCommand, OperationResult<Message>>
{
    public async Task<OperationResult<Message>> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        var conversationResult =
            await unitOfWork.ConversationRepository.GetConversation(new ConversationId(request.ConversationId));
        if (conversationResult.IsFailure)
            return conversationResult.Error;

        User sender;
        if(request.ActingRole == ActingRole.Worker)
        {
            var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.SenderId));
            if (workerResult.IsFailure)
                return workerResult.Error;
            
            if(!workerResult.Value.IsWorkingAt(conversationResult.Value.RepairShopId))
                return ConversationErrors.AccessDenied();
            
            sender = workerResult.Value;

        }else if (request.ActingRole == ActingRole.Customer)
        {
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.SenderId));
            if(customerResult.IsFailure)
                return customerResult.Error;
            
            if(customerResult.Value.Id != conversationResult.Value.CustomerId)
                return ConversationErrors.AccessDenied();
            
            sender = customerResult.Value;
            
        }else { return ConversationErrors.AccessDenied(); }
        
        var addMessageResult = conversationResult.Value.AddMessage(sender, request.Message);
        if(addMessageResult.IsFailure)
            return addMessageResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return addMessageResult.Value;
    }
}