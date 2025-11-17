using system_obslugi_serwisu.Domain.Conversations.Errors;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Users;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Conversations;

public record ConversationId(Guid Value);

public class Conversation
{
    public ConversationId Id { get; private set; }
    public RepairShopId RepairShopId { get; private set; }
    public CustomerId CustomerId { get; private set; }
    public RepairId? RepairId { get; private set; }
    public DateTimeOffset LastModifiedAt { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    public IReadOnlyList<Message> Messages => _messages.AsReadOnly();

    private List<Message> _messages = new();
    
    public bool IsRepairConversation => RepairId != null;

    private Conversation() { }

    private Conversation(RepairShopId repairShopId, CustomerId customerId, RepairId? repairId)
    {
        Id = new ConversationId(Guid.NewGuid());
        RepairShopId = repairShopId;
        CustomerId = customerId;
        RepairId = repairId;
        LastModifiedAt = DateTimeOffset.UtcNow;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public static OperationResult<Conversation> CreateGeneral(RepairShopId repairShopId, CustomerId customerId)
    {
        return new Conversation(repairShopId, customerId, null);
    }
    
    public static OperationResult<Conversation> CreateForRepair(RepairShopId repairShopId, CustomerId customerId, RepairId repairId)
    {
        return new Conversation(repairShopId, customerId, repairId);
    }

    public OperationResult<Message> AddMessage(User user, string message)
    {
        SenderRole role;
        UserId senderId;
        if (user is Customer customer)
        {
            if (customer.Id != CustomerId)
                return ConversationErrors.AccessDenied();
            senderId = new UserId(customer.Id.Value);
            role = SenderRole.Customer;
        }else if (user is Worker worker)
        {
            if(!worker.IsWorkingAt(RepairShopId))
                return ConversationErrors.AccessDenied();
            senderId = new UserId(worker.Id.Value);
            role = SenderRole.RepairShop;
        }
        else
        {
            return ConversationErrors.AccessDenied();
        }

        var messageResult = Message.Create(Id, senderId, role, message);
        if(messageResult.IsFailure)
            return messageResult.Error;
        
        _messages.Add(messageResult.Value);
        LastModifiedAt = DateTimeOffset.UtcNow;
        
        return messageResult.Value;
    }
}