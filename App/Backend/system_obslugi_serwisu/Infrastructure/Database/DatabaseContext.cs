using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Infrastructure.Identity;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : IdentityDbContext<User, ApplicationRole, string>(options)
{
}