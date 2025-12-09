using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;

namespace system_obslugi_serwisu.Infrastructure.RepairNotes;

public class RepairNoteEntityTypeConfiguration : IEntityTypeConfiguration<RepairNote>
{
    public void Configure(EntityTypeBuilder<RepairNote> noteOptions)
    {
        noteOptions.HasKey(rn => rn.Id);
        noteOptions.Property(rn => rn.Id)
            .HasConversion(
                id => id.Value,
                value => new RepairNoteId(value))
            .ValueGeneratedNever();

        noteOptions.Property(rn => rn.RepairId)
            .HasConversion(
                id => id.Value,
                value => new RepairId(value));
        
        noteOptions.Property(rn => rn.WorkerId)
            .HasConversion(
                id => id.Value,
                value => new WorkerId(value));

        noteOptions.Property(rn => rn.Content).HasMaxLength(RepairNote.NoteContentMaxLength);

        noteOptions.Property(rn => rn.CreatedAt);
    }
}