using system_obslugi_serwisu.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public record RepairData
{
    public required RepairShop RepairShop { get; init; }
    public Customer? Customer { get; init; }
    public required ContactInfo ContactInfo { get; init; }
    public required DeviceInfo DeviceInfo { get; init; }
    public required FaultInfo FaultInfo { get; init; }
    public required ReturnInfo ReturnInfo { get; init; }
    public string? AdditionalComment { get; init; }
}

public partial class Repair
{
    public const int AdditionalCommentMaxLength = 500;
    
    public Guid Id { get; private set; }
    public RepairShop RepairShop { get; private set; }
    public Customer? Customer { get; private set; }
    public RepairStatus Status { get; private set; }
    public ContactInfo ContactInfo { get; private set; }
    public DeviceInfo DeviceInfo { get; private set; }
    public FaultInfo FaultInfo { get; private set; }
    public ReturnInfo ReturnInfo { get; private set; }
    public IReadOnlyList<RepairStep> RepairHistory => _repairHistory.AsReadOnly();
    public string? AdditionalComment { get; private set; }
    public Quote? Quote { get; private set; }
    public Money? DiagnosisFee { get; private set; }
    public Money? FinalCost { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    
    private List<RepairStep> _repairHistory = new();

    private Repair() { }

    private Repair(RepairShop repairShop, Customer? customer, RepairStatus status, ContactInfo contactInfo,
        DeviceInfo deviceInfo, FaultInfo faultInfo, ReturnInfo returnInfo, string? additionalComment)
    {
        Id = Guid.NewGuid();
        RepairShop = repairShop;
        Customer = customer;
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
        
        return new Repair(data.RepairShop, data.Customer, RepairStatus.Created, data.ContactInfo,
            data.DeviceInfo, data.FaultInfo, data.ReturnInfo, data.AdditionalComment);
    }

    private void AddRepairStep(RepairStep repairStep)
    {
        _repairHistory.Add(repairStep);
    }
}