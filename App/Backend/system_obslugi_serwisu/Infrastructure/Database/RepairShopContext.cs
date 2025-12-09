using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Infrastructure.Parts;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class RepairShopContext(DbContextOptions<RepairShopContext> options) : DbContext(options)
{
    public DbSet<Part> Parts { get; set; }
    public DbSet<PartReservation> PartReservations { get; set; }
    public DbSet<PartCategory> PartCategories { get; set; }
    public DbSet<PartNeeded> PartsNeeded { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        new PartEntityTypeConfiguration().Configure(builder.Entity<Part>());
        new PartReservationEntityTypeConfiguration().Configure(builder.Entity<PartReservation>());
        new PartCategoryEntityTypeConfiguration().Configure(builder.Entity<PartCategory>());
        new NeededPartEntityTypeConfiguration().Configure(builder.Entity<PartNeeded>());
    }
}