using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.Customers;

public class CustomerEntityTypeConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> customerConfiguration)
    {
        customerConfiguration.HasKey(customer => customer.Id);

        customerConfiguration.OwnsOne(customer => customer.Email, email =>
        {
            email.Property(e => e.Value).HasMaxLength(Email.EmailMaxLength);
        });
        
        customerConfiguration.OwnsOne(customer => customer.Name, name =>
        {
            name.Property(n => n.FirstName).HasMaxLength(Name.FirstNameMaxLength);
            name.Property(n => n.LastName).HasMaxLength(Name.LastNameMaxLength);
            name.Property(n => n.CompanyName).HasMaxLength(Name.CompanyNameMaxLength);
        });

        customerConfiguration.OwnsOne(customer => customer.TaxIdNumber, taxIdNumber =>
        {
            taxIdNumber.Property(tin => tin.Value).HasMaxLength(Tin.TinMaxLength);
        });
        
        customerConfiguration.OwnsOne(customer => customer.Address, address =>
        {
            address.Property(addr => addr.RecipientName).HasMaxLength(Address.RecipientNameMaxLength);
            address.Property(addr => addr.Street).HasMaxLength(Address.StreetMaxLength);
            address.Property(addr => addr.BuildingNumber).HasMaxLength(Address.BuildingNumberMaxLength);
            address.Property(addr => addr.ApartmentNumber).HasMaxLength(Address.ApartmentNumberMaxLength);
            address.Property(addr => addr.City).HasMaxLength(Address.CityMaxLength);
            address.OwnsOne(addr => addr.PostalCode, postalCode =>
            {
                postalCode.Property(p => p.Value).HasMaxLength(PostalCode.PostalCodeMaxLength);
            });
            address.Property(addr => addr.Country);
        });
    }
}