using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.Images;

public class ImageEntityTypeConfiguration : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> imageConfiguration)
    {
        imageConfiguration.HasKey(image => image.Id);
        imageConfiguration.Property(image => image.Id)
            .HasConversion(
                id => id.Value,
                value => new ImageId(value)
            )
            .ValueGeneratedNever();
    }
}