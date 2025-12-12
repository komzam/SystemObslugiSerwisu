using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Infrastructure.Parts;

public class PartOrderItemEntityTypeConfiguration : IEntityTypeConfiguration<PartOrderItem>
{
    public void Configure(EntityTypeBuilder<PartOrderItem> orderItemConfiguration)
    {
        orderItemConfiguration.HasKey(oi => oi.Id);
        orderItemConfiguration.Property(oi => oi.Id)
            .HasConversion(
                id => id.Value,
                value => new PartOrderItemId(value))
            .ValueGeneratedNever();

        orderItemConfiguration.Property(oi => oi.PartOrderId)
            .HasConversion(
                id => id.Value,
                value => new PartOrderId(value));
        
        orderItemConfiguration.Property(oi => oi.PartId)
            .HasConversion(
                id => id.Value,
                value => new PartId(value));

        orderItemConfiguration.Property(oi => oi.Quantity);
        orderItemConfiguration.Property(oi => oi.Price);

        orderItemConfiguration
            .HasOne(oi => oi.PartOrderId)
            .WithMany()
            .HasForeignKey(oi => oi.PartOrderId);
    }
}