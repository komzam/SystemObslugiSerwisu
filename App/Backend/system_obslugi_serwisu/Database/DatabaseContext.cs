using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Identity;

namespace system_obslugi_serwisu.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : IdentityDbContext<User, ApplicationRole, string>(options)
{
}