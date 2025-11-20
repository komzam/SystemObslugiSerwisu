using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Images;

public interface IImageRepository
{
    public Task<OperationResult<Image>> GetImage(ImageId imageId);
    public Task<OperationResult<RepairShopImage>> GetRepairShopImage(RepairShopId repairShopId, RepairShopImageType imageType);
    public Task<OperationResult<List<RepairImage>>> GetRepairImages(RepairId repairId);
}