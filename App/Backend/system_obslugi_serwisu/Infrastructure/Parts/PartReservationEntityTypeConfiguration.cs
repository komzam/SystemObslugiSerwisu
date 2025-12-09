using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Infrastructure.Parts;

public class PartReservationEntityTypeConfiguration : IEntityTypeConfiguration<PartReservation>
{
    public void Configure(EntityTypeBuilder<PartReservation> reservationOptions)
    {
        reservationOptions.HasKey(r => r.Id);
        reservationOptions.Property(r => r.Id)
            .HasConversion(
                id => id.Value,
                value => new PartReservationId(value))
            .ValueGeneratedNever();
        
        reservationOptions.Property(r => r.PartId)
            .HasConversion(
                id => id.Value,
                value => new PartId(value))
            .IsRequired();
        
        reservationOptions.Property(r => r.RepairId)
            .HasConversion(
                id => id.Value,
                value => new RepairId(value))
            .IsRequired();
        
        reservationOptions.Property(r => r.QuantityReserved)
            .IsRequired();
        
        reservationOptions.Property(r => r.QuantityRequested)
            .IsRequired();
        
        reservationOptions.Property(r => r.Status)
            .IsRequired();
        
        reservationOptions.HasOne<Part>()
            .WithMany(p => p.Reservations)
            .HasForeignKey(r => r.PartId);
        
        reservationOptions.HasIndex(r => r.RepairId);
    }
}