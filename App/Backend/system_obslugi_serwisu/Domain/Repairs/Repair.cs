using system_obslugi_serwisu.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;

namespace system_obslugi_serwisu.Domain.Repairs;

public class Repair
{
    public Guid Id { get;}
    public Customer Customer { get;}

    public RepairShop RepairShop { get;}
    
    public RepairStatus Status { get;}

    private Repair(Customer customer, RepairShop repairShop, RepairStatus status)
    {
        Id = Guid.NewGuid();
        Customer = customer;
        RepairShop = repairShop;
        Status = status;
    }

    public static OperationResult<Repair> Create(Customer customer, RepairShop repairShop, RepairStatus status)
    {
        return new Repair(customer, repairShop, status);
    }
}