using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops;

public interface IRepairShopStorageService
{
    public Task<OperationResult<string>> GetRepairShopImage(RepairShopId id);
}