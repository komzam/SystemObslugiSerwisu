using system_obslugi_serwisu.Domain.RepairShops;

namespace system_obslugi_serwisu.Domain.Workers;

public class Worker
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public RepairShop RepairShop { get; private set; }

    private Worker(){}
}