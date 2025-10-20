using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Services;

public interface IServiceRepository
{
    public Task<OperationResult<PaginatedList<Service>>> Get(Guid repairShopId, int pageNumber, int pageSize);
}