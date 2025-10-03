using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Database;

namespace system_obslugi_serwisu.Extensions;

public class MigrationExtension
{
    public static void ApplyMigrations(IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.CreateScope()){
            var databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            databaseContext.Database.Migrate();
        }
    }
}