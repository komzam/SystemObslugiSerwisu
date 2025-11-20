using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.RepairShops;

public class RepairShopImageEntityTypeConfiguration : IEntityTypeConfiguration<RepairShopImage>
{
    public void Configure(EntityTypeBuilder<RepairShopImage> repairShopImageConfiguration)
    {
        repairShopImageConfiguration.HasKey(repairShopImage => repairShopImage.ImageId);
        repairShopImageConfiguration.Property(repairShopImage => repairShopImage.ImageId)
            .HasConversion(
                id => id.Value,
                value => new ImageId(value)
            )
            .ValueGeneratedNever();
        
        repairShopImageConfiguration.HasOne(repairShopImage => repairShopImage.Image)
            .WithOne()
            .HasForeignKey<RepairShopImage>(repairShopImage => repairShopImage.ImageId);
        
        
        repairShopImageConfiguration.Property(repairShopImage => repairShopImage.RepairShopId)
            .HasConversion(
                id => id.Value,
                value => new RepairShopId(value)
            );

        repairShopImageConfiguration.Property(repairShopImage => repairShopImage.ImageType);
    }
}