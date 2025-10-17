using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Reviews;

public interface IReviewRepository
{
    public Task<OperationResult<PaginatedList<Review>>> Get(Guid repairShopId, int pageNumber, int pageSize);
}