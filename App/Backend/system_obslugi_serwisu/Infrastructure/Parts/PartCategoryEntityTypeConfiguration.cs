using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Infrastructure.Parts;

public class PartCategoryEntityTypeConfiguration : IEntityTypeConfiguration<PartCategory>
{
    public void Configure(EntityTypeBuilder<PartCategory> categoryOptions)
    {
        categoryOptions.HasKey(c => c.Id);
        categoryOptions.Property(c => c.Id)
            .HasConversion(
                id => id.Value,
                value => new PartCategoryId(value))
            .ValueGeneratedNever();

        categoryOptions.Property(c => c.Name)
            .HasMaxLength(PartCategory.NameMaxLength)
            .IsRequired();
    }
}