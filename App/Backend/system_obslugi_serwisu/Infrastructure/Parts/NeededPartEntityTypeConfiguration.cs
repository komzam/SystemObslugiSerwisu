using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Infrastructure.Parts;

public class NeededPartEntityTypeConfiguration : IEntityTypeConfiguration<PartNeeded>
{
    public void Configure(EntityTypeBuilder<PartNeeded> partNeededOptions)
    {
        partNeededOptions.HasKey(pn => pn.Id);
        partNeededOptions.Property(pn => pn.Id)
            .HasConversion(
                id => id.Value,
                value => new PartNeededId(value))
            .ValueGeneratedNever();

        partNeededOptions.Property(pn => pn.RepairId)
            .HasConversion(
                id => id.Value,
                value => new RepairId(value));

        partNeededOptions.Property(pn => pn.PartId)
            .HasConversion(
                id => id.Value,
                value => new PartId(value));

        partNeededOptions.Property(pn => pn.Quantity);
    }
}