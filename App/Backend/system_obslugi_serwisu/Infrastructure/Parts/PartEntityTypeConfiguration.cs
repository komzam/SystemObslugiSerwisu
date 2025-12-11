using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Infrastructure.Parts;

public class PartEntityTypeConfiguration : IEntityTypeConfiguration<Part>
{
    public void Configure(EntityTypeBuilder<Part> partConfiguration)
    {
        partConfiguration.HasKey(p => p.Id);
        partConfiguration.Property(p => p.Id)
            .HasConversion(
                id => id.Value,
                value => new PartId(value))
            .ValueGeneratedNever();
        
        partConfiguration.Property(p => p.Name)
            .HasMaxLength(Part.PartNameMaxLength)
            .IsRequired();
        
        partConfiguration.Property(p => p.ManufacturerCode)
            .HasMaxLength(Part.ManufacturerCodeMaxLength)
            .IsRequired();

        partConfiguration.Property(p => p.NeedsReorder).IsRequired();
        
        partConfiguration.Property(p => p.CategoryId)
            .HasConversion(
                id => id.Value,
                value => new PartCategoryId(value))
            .IsRequired();
        
        partConfiguration.Property(p => p.Price)
            .IsRequired();
        
        partConfiguration.Property(p => p.Stock)
            .IsRequired();
        
        partConfiguration.Property(p => p.Reserved)
            .IsRequired();
        
        partConfiguration.Property(p => p.LowStockThreshold)
            .IsRequired();
        
        partConfiguration.Ignore(p => p.Available);
        partConfiguration.Ignore(p => p.StockLevel);
        
        partConfiguration.HasMany(p => p.Reservations)
            .WithOne()
            .HasForeignKey("PartId");

        partConfiguration.Ignore(p => p.DomainEvents);
    }
}