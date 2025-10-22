using system_obslugi_serwisu.Shared;
using system_obslugi_serwisu.Domain.Customers;
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
}

public class Repair
{
    public Guid Id { get; private set; }
    public RepairShop RepairShop { get; private set; }
    public Customer? Customer { get; private set; }
    public RepairStatus Status { get; private set; }
    public ContactInfo ContactInfo { get; private set; }
    public DeviceInfo DeviceInfo { get; private set; }
    public FaultInfo FaultInfo { get; private set; }
    public ReturnInfo ReturnInfo { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    private Repair() { }

    private Repair(RepairShop repairShop, Customer? customer, RepairStatus status, ContactInfo contactInfo,
        DeviceInfo deviceInfo, FaultInfo faultInfo, ReturnInfo returnInfo)
    {
        Id = Guid.NewGuid();
        RepairShop = repairShop;
        Customer = customer;
        Status = status;
        ContactInfo = contactInfo;
        DeviceInfo = deviceInfo;
        FaultInfo = faultInfo;
        ReturnInfo = returnInfo;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public static OperationResult<Repair> Create(RepairData data)
    {
        return new Repair(data.RepairShop, data.Customer, RepairStatus.Booked, data.ContactInfo,
            data.DeviceInfo, data.FaultInfo, data.ReturnInfo);
    }
}