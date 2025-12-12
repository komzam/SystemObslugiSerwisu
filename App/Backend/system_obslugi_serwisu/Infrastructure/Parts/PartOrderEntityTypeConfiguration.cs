using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Infrastructure.Parts;

public class PartOrderEntityTypeConfiguration : IEntityTypeConfiguration<PartOrder>
{
    public void Configure(EntityTypeBuilder<PartOrder> orderConfiguration)
    {
        orderConfiguration.HasKey(o => o.Id);
        orderConfiguration.Property(o => o.Id)
            .HasConversion(
                id => id.Value,
                value => new PartOrderId(value))
            .ValueGeneratedNever();

        orderConfiguration.Property(o => o.SupplierName).HasMaxLength(PartOrder.SupplierNameMaxLength);
        orderConfiguration.Property(o => o.SupplierOrderNumber).HasMaxLength(PartOrder.SupplierOrderNumberMaxLength);
        orderConfiguration.Property(o => o.Status);
        orderConfiguration.Property(o => o.OrderedAt);
        orderConfiguration.Property(o => o.CreatedAt);
        orderConfiguration.HasMany(o => o.Items)
            .WithOne()
            .HasForeignKey(oi => oi.PartOrderId);
        
        orderConfiguration.Ignore(p => p.DomainEvents);
    }
}