using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Domain.RepairShops;

public enum RepairShopImageType
{
    Main,
    Miniature
}

public class RepairShopImage
{
    public required ImageId ImageId { get; set; }
    public Image Image { get; set; }
    public required RepairShopId RepairShopId { get; set; }
    public required RepairShopImageType ImageType { get; set; }
    
    public static RepairShopImage Create(RepairShopId repairShopId, RepairShopImageType imageType)
    {
        return new RepairShopImage
        {
            ImageId = new ImageId(Guid.NewGuid()),
            RepairShopId = repairShopId,
            ImageType = imageType
        };
    }
}