using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Infrastructure.Database;

namespace system_obslugi_serwisu.Infrastructure.Migrations;

public class MigrationRunner
{
    public static void ApplyMigrations(WebApplication app)
    {
        using (var scope = app.Services.CreateScope()){
            var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            try
            {
                databaseContext.Database.Migrate();
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