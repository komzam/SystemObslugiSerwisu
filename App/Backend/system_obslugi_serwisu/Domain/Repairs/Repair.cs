using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;

namespace system_obslugi_serwisu.Domain.Repairs;

public record RepairData
{
    public required TicketNumber TicketNumber { get; init; }
    public required RepairShopId RepairShopId { get; init; }
    public CustomerId? CustomerId { get; init; }
    public required ContactInfo ContactInfo { get; init; }
    public required DeviceInfo DeviceInfo { get; init; }
    public required FaultInfo FaultInfo { get; init; }
    public required ReturnInfo ReturnInfo { get; init; }
    public string? AdditionalComment { get; init; }
}

public record RepairId(Guid Value);

public partial class Repair
{
    public const int AdditionalCommentMaxLength = 500;
    
    public RepairId Id { get; private set; }
    public TicketNumber TicketNumber { get; private set; }
    public RepairShopId RepairShopId { get; private set; }
    public CustomerId? CustomerId { get; private set; }
    public ConversationId? ConversationId { get; private set; }
    public RepairStatus Status { get; private set; }
    public ContactInfo ContactInfo { get; private set; }
    public DeviceInfo DeviceInfo { get; private set; }
    public FaultInfo FaultInfo { get; private set; }
    public ReturnInfo ReturnInfo { get; private set; }
    public IReadOnlyList<RepairStep> RepairHistory => _repairHistory.AsReadOnly();
    public IReadOnlyList<RepairImage> Images => _images.AsReadOnly();
    public string? AdditionalComment { get; private set; }
    public Quote? Quote { get; private set; }
    public Money? DiagnosisFee { get; private set; }
    public Money? FinalCost { get; private set; }
    public WorkerId? AssignedWorkerId { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    
    private List<RepairImage> _images = new();
    private List<RepairStep> _repairHistory = new();
    
    public bool IsClosed => Status is RepairStatus.Completed or RepairStatus.Canceled;

    private Repair() { }

    private Repair(TicketNumber ticketNumber, RepairShopId repairShopId, CustomerId? customerId, RepairStatus status, ContactInfo contactInfo,
        DeviceInfo deviceInfo, FaultInfo faultInfo, ReturnInfo returnInfo, string? additionalComment)
    {
        Id = new RepairId(Guid.NewGuid());
        TicketNumber = ticketNumber;
        RepairShopId = repairShopId;
        CustomerId = customerId;
        Status = status;
        ContactInfo = contactInfo;
        DeviceInfo = deviceInfo;
        FaultInfo = faultInfo;
        ReturnInfo = returnInfo;
        AdditionalComment = additionalComment;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    private static OperationResult ValidateInput(RepairData data)
    {
        if (data.AdditionalComment != null && data.AdditionalComment.Length > AdditionalCommentMaxLength)
            return RepairErrors.AdditionalCommentTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<Repair> Create(RepairData data)
    {
        var validationResult = ValidateInput(data);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new Repair(data.TicketNumber, data.RepairShopId, data.CustomerId, RepairStatus.Created, data.ContactInfo,
            data.DeviceInfo, data.FaultInfo, data.ReturnInfo, data.AdditionalComment);
    }

    private void AddRepairStep(RepairStep repairStep)
    {
        _repairHistory.Add(repairStep);
    }

    public void AssignConversation(ConversationId conversationId)
    {
        ConversationId = conversationId;
    }
    
    public OperationResult AssignWorker(Worker worker)
    {
        if (!worker.IsWorkingAt(RepairShopId))
            return RepairErrors.AccessDenied();

        if (AssignedWorkerId is not null && AssignedWorkerId != worker.Id)
            return RepairErrors.WorkerAlreadyAssigned();
        
        AssignedWorkerId = worker.Id;
        return OperationResult.Success();
    }

    public OperationResult UnAssignWorker(Worker worker)
    {
        if (AssignedWorkerId is not null && AssignedWorkerId != worker.Id)
            return RepairErrors.AccessDenied();
        
        AssignedWorkerId = null;
        return OperationResult.Success();
    }
}