using system_obslugi_serwisu.Identity;

namespace system_obslugi_serwisu.Types;

public class Repair
{
    public Guid Id { get;}
    public User Customer { get;}

    public RepairShop RepairShop { get;}
    
    public RepairStatus Status { get;}

    private Repair(User customer, RepairShop repairShop, RepairStatus status)
    {
        Id = Guid.NewGuid();
        Customer = customer;
        RepairShop = repairShop;
        Status = status;
    }

    public static Result<Repair> Create(User customer, RepairShop repairShop, RepairStatus status)
    {
        return new Repair(customer, repairShop, status);
    }
}