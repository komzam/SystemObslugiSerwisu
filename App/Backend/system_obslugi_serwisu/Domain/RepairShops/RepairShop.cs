using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Infrastructure.Identity;

namespace system_obslugi_serwisu.Domain.RepairShops;

public class RepairShop
{
    public Guid Id;
    
    public string Name { get; private set; }
    public Email Email { get; private set; }
    public PhoneNumber Phone { get; private set; }
    public Address Address { get; private set; }
    public List<Worker> Workers { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    private RepairShop() { }

    private RepairShop(string name, Address address, List<Worker> workers)
    {
        Id = Guid.NewGuid();
        Name = name;
        Address = address;
        Workers = workers;
    }

    public static Result<RepairShop> Create(string name, Address address, List<Worker> workers)
    {
        return new RepairShop(name, address, workers);
    }
}