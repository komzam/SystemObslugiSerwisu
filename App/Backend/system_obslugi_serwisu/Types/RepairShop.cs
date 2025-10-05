using system_obslugi_serwisu.Identity;

namespace system_obslugi_serwisu.Types;

public class RepairShop
{
    public Guid Id;
    
    public string Name { get; }
    
    public Address Address { get; }

    public List<User> Workers { get; }

    private RepairShop(string name, Address address, List<User> workers)
    {
        Id = Guid.NewGuid();
        Name = name;
        Address = address;
        Workers = workers;
    }

    public static Result<RepairShop> Create(string name, Address address, List<User> workers)
    {
        return new RepairShop(name, address, workers);
    }
}