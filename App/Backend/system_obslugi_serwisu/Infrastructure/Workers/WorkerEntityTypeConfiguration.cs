using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;

namespace system_obslugi_serwisu.Infrastructure.Workers;

public class WorkerEntityTypeConfiguration : IEntityTypeConfiguration<Worker>
{

    public void Configure(EntityTypeBuilder<Worker> workerConfiguration)
    {
        workerConfiguration.HasKey(worker => worker.Id);
        workerConfiguration.Property(worker => worker.Id)
            .HasConversion(
                id => id.Value,
                value => new WorkerId(value))
            .ValueGeneratedNever();

        workerConfiguration.Property(worker => worker.RepairShopId).HasConversion(
            id => id == null ? (Guid?)null : id.Value,
            value => value == null ? null : new RepairShopId(value.Value));
        
        workerConfiguration.Property(worker => worker.AssignedRepairId)
            .HasConversion(
                id => id == null ? (Guid?)null : id.Value,
                value => value == null ? null : new RepairId(value.Value));
        
        workerConfiguration.Property(worker => worker.FirstName).HasMaxLength(Worker.FirstNameMaxLength);
        workerConfiguration.Property(worker => worker.LastName).HasMaxLength(Worker.LastNameMaxLength);
    }
}