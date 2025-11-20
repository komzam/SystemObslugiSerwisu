using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops;

public class RepairShopInclude
{
    public bool Reviews = false;
    public bool Services = false;
}

public interface IRepairShopRepository
{
    public Task<OperationResult<RepairShop>> Get(RepairShopId id);
    public Task<OperationResult<List<RepairShop>>> GetRepairShops(List<RepairShopId> ids);
    
    public Task<OperationResult<RepairShop>> Get(RepairShopId id, RepairShopInclude repairShopInclude);
    
    public Task<OperationResult<PaginatedList<RepairShop>>> SearchByName(string name, int pageNumber, int pageSize);
}