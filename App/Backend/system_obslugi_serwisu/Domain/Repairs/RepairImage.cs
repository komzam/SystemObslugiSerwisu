using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public class RepairImage
{
    public required ImageId ImageId { get; set; }
    public Image Image { get; set; }
    public required RepairId RepairId { get; set; }

    public static RepairImage Create(RepairId repairId)
    {
        return new RepairImage
        {
            ImageId = new ImageId(Guid.NewGuid()),
            RepairId = repairId
        };
    }
}