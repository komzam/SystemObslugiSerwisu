using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Infrastructure.Identity;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : IdentityDbContext<User, ApplicationRole, string>(options)
{
    public DbSet<Customer> Customers {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<Customer>(c =>
        {
            c.Property(user => user.Email)
                .HasConversion(
                    email => email.Value,
                    email => Email.Create(email).Value);
            
            c.OwnsOne(customer => customer.Name, name =>
            {
                name.Property(n => n.FirstName);
                name.Property(n => n.LastName);
                name.Property(n => n.CompanyName);
            });

            c.OwnsOne(customer => customer.TaxIdNumber, taxIdNumber =>
            {
                taxIdNumber.Property(tin => tin.Value);
            });
            
            c.OwnsOne(customer => customer.Address, address =>
            {
                address.Property(addr => addr.RecipientName);
                address.Property(addr => addr.Street);
                address.Property(addr => addr.BuildingNumber);
                address.Property(addr => addr.ApartmentNumber);
                address.Property(addr => addr.City);
                address.Property(addr => addr.PostalCode).HasConversion(
                    postalCode => postalCode.Value,
                    postalCode => new PostalCode(postalCode));;
                address.Property(addr => addr.Country);
            });
        });
    }
}