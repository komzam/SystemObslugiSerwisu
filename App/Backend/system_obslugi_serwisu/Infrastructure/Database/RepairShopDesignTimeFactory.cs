using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class RepairShopDesignTimeFactory 
    : IDesignTimeDbContextFactory<RepairShopContext>
{
    public RepairShopContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var connectionString = config.GetConnectionString("DefaultConnection");

        var optionsBuilder = new DbContextOptionsBuilder<RepairShopContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new RepairShopContext(optionsBuilder.Options);
    }
}