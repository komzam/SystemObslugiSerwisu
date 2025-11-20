using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs;

public class RepairImageEntityTypeConfiguration : IEntityTypeConfiguration<RepairImage>
{
    public void Configure(EntityTypeBuilder<RepairImage> repairImageConfiguration)
    {
        repairImageConfiguration.HasKey(repairImage => repairImage.ImageId);
        repairImageConfiguration.Property(repairImage => repairImage.ImageId)
            .HasConversion(
                id => id.Value,
                value => new ImageId(value)
            )
            .ValueGeneratedNever();
        
        repairImageConfiguration.HasOne(repairImage => repairImage.Image)
            .WithOne()
            .HasForeignKey<RepairImage>(repairImage => repairImage.ImageId);
        
        repairImageConfiguration.Property(repairImage => repairImage.RepairId)
            .HasConversion(
                id => id.Value,
                value => new RepairId(value)
            );
    }
}