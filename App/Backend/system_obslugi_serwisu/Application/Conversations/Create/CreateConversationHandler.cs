using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Users;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Conversations.Create;

public class CreateConversationHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateConversationCommand, OperationResult<Conversation>>
{
    public async Task<OperationResult<Conversation>> Handle(CreateConversationCommand request, CancellationToken cancellationToken)
    {
        RepairShopId repairShopId;
        CustomerId customerId;
        User sender;
        
        if(request.ActingRole == ActingRole.Worker)
        {
            var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.CreatorId));
            if (workerResult.IsFailure)
                return workerResult.Error;
            
            if(!workerResult.Value.IsEmployed())
                return ConversationErrors.AccessDenied();
            
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.ReceiverId));
            if (customerResult.IsFailure)
                return customerResult.Error;
            
            repairShopId = workerResult.Value.RepairShopId!;
            customerId = customerResult.Value.Id;
            sender = workerResult.Value;

        }else if (request.ActingRole == ActingRole.Customer)
        {
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CreatorId));
            if(customerResult.IsFailure)
                return customerResult.Error;
            
            var repairShopResult = await unitOfWork.RepairShopRepository.Get(new RepairShopId(request.ReceiverId));
            if(repairShopResult.IsFailure)
                return  repairShopResult.Error;
            
            repairShopId = repairShopResult.Value.Id;
            customerId = customerResult.Value.Id;
            sender = customerResult.Value;
            
        }else { return ConversationErrors.AccessDenied(); }
        
        var conversationResult = Conversation.Create(repairShopId, customerId);
        if(conversationResult.IsFailure)
            return conversationResult.Error;

        var addMessageResult = conversationResult.Value.AddMessage(sender, request.FirstMessage);
        if(addMessageResult.IsFailure)
            return addMessageResult.Error;
        
        var conversationCreateResult = await unitOfWork.ConversationRepository.CreateConversation(conversationResult.Value);
        if(conversationCreateResult.IsFailure)
            return conversationCreateResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return conversationResult.Value;
    }
}