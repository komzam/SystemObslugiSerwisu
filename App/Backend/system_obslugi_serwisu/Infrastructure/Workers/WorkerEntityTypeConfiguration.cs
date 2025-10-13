using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;

namespace system_obslugi_serwisu.Infrastructure.Workers;

public class WorkerEntityTypeConfiguration : IEntityTypeConfiguration<Worker>
{

    public void Configure(EntityTypeBuilder<Worker> workerConfiguration)
    {
        workerConfiguration.HasKey(worker => worker.Id);
        workerConfiguration.Property(worker => worker.Name).HasMaxLength(100);
    }
}