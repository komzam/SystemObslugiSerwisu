using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Infrastructure.Database;

namespace system_obslugi_serwisu.Infrastructure.RepairShopMigrations;

public class RepairShopMigrationRunner
{
    public static async Task ApplyMigrations(WebApplication app)
    {
        using (var scope = app.Services.CreateScope()){
            var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            var repairShopIds = await databaseContext.RepairShops
                .Select(rs => rs.Id.Value)
                .ToListAsync();

            var repairShopContextFactory = scope.ServiceProvider.GetRequiredService<RepairShopContextFactory>();
            
            foreach (var repairShopId in repairShopIds)
            {
                try
                {
                    repairShopContextFactory.RepairShopId=repairShopId.ToString();
                    
                    var context = repairShopContextFactory.Create();
                    await context.Database.ExecuteSqlRawAsync($"CREATE SCHEMA IF NOT EXISTS \"rs_{repairShopId}\";");
                    
                    await context.Database.MigrateAsync();
                    
                    await context.DisposeAsync();
                }
                catch (Exception e)
                {
                    var logger = app.Services.GetRequiredService<ILogger<Program>>();
                    logger.LogCritical("Database migration failed. Application will shut down.");
                    Environment.Exit(1);
                }
            }
            
        }
    }
}