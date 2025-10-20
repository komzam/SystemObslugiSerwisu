using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.Services;

public class ServiceEntityTypeConfiguration : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> serviceConfiguration)
    {
        serviceConfiguration.HasKey(service => service.Id);
        serviceConfiguration.Property(service => service.Id).ValueGeneratedNever();

        serviceConfiguration.HasOne(service => service.RepairShop);
        
        serviceConfiguration.Property(service => service.Name).HasMaxLength(Service.NameMaxLength);

        serviceConfiguration.OwnsOne(service => service.Price, price =>
        {
            price.Property(pr => pr.Value);
            price.Property(pr => pr.Currency).HasConversion(
                currency => currency.Code,
                currencyCode => Currency.Create(currencyCode).Value
            );
        });
    }
}