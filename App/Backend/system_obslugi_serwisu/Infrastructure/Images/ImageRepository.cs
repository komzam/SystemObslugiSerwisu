using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Images;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Shared.Errors;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Images;

public class ImageRepository(DatabaseContext databaseContext) : IImageRepository
{
    public async Task<OperationResult<Image>> GetImage(ImageId imageId)
    {
        Image? image;
        try
        {
            image = await databaseContext.Images.FindAsync(imageId);
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        if (image == null)
            return ImageErrors.ImageNotFound();

        return image;
    }

    public async Task<OperationResult<RepairShopImage>> GetRepairShopImage(RepairShopId repairShopId, RepairShopImageType imageType)
    {
        RepairShopImage? image;
        try
        {
            image = await databaseContext.RepairShopImages
                .Where(rsi => rsi.RepairShopId == repairShopId && rsi.ImageType == imageType)
                .FirstOrDefaultAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        if (image == null)
            return ImageErrors.ImageNotFound();

        return image;
    }

    public async Task<OperationResult<List<RepairImage>>> GetRepairImages(RepairId repairId)
    {
        List<RepairImage> images;
        try
        {
            images = await databaseContext.RepairImages
                .Where(ri => ri.RepairId == repairId)
                .ToListAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return images;
    }

    public async Task<OperationResult<RepairImage>> GetRepairImage(ImageId imageId)
    {
        RepairImage? image;
        try
        {
            image = await databaseContext.RepairImages
                .Where(ri => ri.ImageId == imageId)
                .FirstOrDefaultAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        if (image == null)
            return ImageErrors.ImageNotFound();

        return image;
    }

    public async Task<OperationResult> DeleteImage(ImageId imageId)
    {
        try
        {
            await databaseContext.Images.Where(image => image.Id == imageId)
                .ExecuteDeleteAsync();
            
            return OperationResult.Success();
        }catch
        {
            return DatabaseErrors.UnknownError();
        }
    }
}