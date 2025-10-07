using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Infrastructure.Database;

namespace system_obslugi_serwisu.Infrastructure.Migrations;

public class MigrationRunner
{
    public static void ApplyMigrations(IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.CreateScope()){
            var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            databaseContext.Database.Migrate();
        }
    }
}