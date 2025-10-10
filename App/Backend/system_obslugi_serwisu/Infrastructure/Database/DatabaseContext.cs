using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Infrastructure.Identity;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Infrastructure.Customers;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : IdentityDbContext<User, ApplicationRole, string>(options)
{
    public DbSet<Customer> Customers {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        new CustomerEntityTypeConfiguration().Configure(builder.Entity<Customer>());
    }
}