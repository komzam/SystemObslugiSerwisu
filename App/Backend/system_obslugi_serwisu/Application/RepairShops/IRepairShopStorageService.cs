using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops;

public interface IRepairShopStorageService
{
    public Task<OperationResult<ImageDto>> GetRepairShopImage(RepairShopImage image);
    public Task<OperationResult<string>> AddRepairShopImage(RepairShopImage image, string contentType);
}