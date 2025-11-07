using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Services;

public interface IServiceRepository
{
    public Task<OperationResult<PaginatedList<Service>>> Get(RepairShopId repairShopId, int pageNumber, int pageSize);
}