using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Infrastructure.Identity;

namespace system_obslugi_serwisu.Domain.RepairShops;

public class RepairShop
{
    public Guid Id;
    
    public string Name { get; }
    
    public Address Address { get; }

    public List<Worker> Workers { get; }

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