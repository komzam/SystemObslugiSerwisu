using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Services;

namespace system_obslugi_serwisu.Infrastructure.Services;

public class ServiceEntityTypeConfiguration : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> serviceConfiguration)
    {
        serviceConfiguration.HasKey(service => service.Id);

        serviceConfiguration.HasOne(service => service.RepairShop);
        
        serviceConfiguration.Property(service => service.Name).HasMaxLength(Service.NameMaxLength);

        serviceConfiguration.Property(service => service.Price);
        
        serviceConfiguration.Property(service => service.Currency);
    }
}