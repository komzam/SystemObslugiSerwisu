using Microsoft.EntityFrameworkCore;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class RepairShopContextFactory
{
    private string _connectionStringTemplate;
    public string RepairShopId { get; set; } = "";
    

    public RepairShopContextFactory(string? connectionStringTemplate)
    {
        _connectionStringTemplate = connectionStringTemplate??"";
    }

    public RepairShopContext Create()
    {
        RepairShopContext context = null;

        if (!string.IsNullOrWhiteSpace(RepairShopId))
        {
            var dbContextOptionsBuilder = new DbContextOptionsBuilder<RepairShopContext>();
            dbContextOptionsBuilder.UseNpgsql($"{_connectionStringTemplate};SearchPath=rs_{RepairShopId}");
            
            context = new RepairShopContext(dbContextOptionsBuilder.Options);
        }

        return context;
    }
}