using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Infrastructure.Shared;

namespace system_obslugi_serwisu.Infrastructure.RepairShops;

public class RepairShopEntityTypeConfiguration : IEntityTypeConfiguration<RepairShop>
{
    private void ConfigureDay(OwnedNavigationBuilder<OpeningHours, TimeInterval> builder)
    {
        builder.Property(day => day.From);
        builder.Property(day => day.To);
    }

    public void Configure(EntityTypeBuilder<RepairShop> repairShopConfiguration)
    {
        repairShopConfiguration.HasKey(repairShop => repairShop.Id);

        repairShopConfiguration.Property(repairShop => repairShop.Name).HasMaxLength(RepairShop.NameMaxLength);
        
        repairShopConfiguration.Property(repairShop => repairShop.TimeZoneId).HasMaxLength(TimeZoneHelper.TimeZoneMaxLength);
        
        repairShopConfiguration.Property(repairShop => repairShop.AboutUs).HasMaxLength(RepairShop.AboutUsMaxLength);
        
        repairShopConfiguration.Property(repairShop => repairShop.Rating);
        
        repairShopConfiguration.Property(repairShop => repairShop.ReviewCount);
        
        repairShopConfiguration.OwnsOne(repairShop => repairShop.Email, email =>
        {
            email.Property(e => e.Value).HasMaxLength(Email.EmailMaxLength);
        });

        repairShopConfiguration.OwnsOne(repairShop => repairShop.Phone, phoneNumber =>
        {
            phoneNumber.Property(phone => phone.Number).HasMaxLength(PhoneNumber.PhoneNumberMaxLength);
            phoneNumber.Property(phone => phone.RegionCode).HasMaxLength(PhoneNumber.RegionCodeMaxLength);
        });
        
        repairShopConfiguration.OwnsOne(repairShop => repairShop.Address, address =>
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
        
        repairShopConfiguration.OwnsOne(repairShop => repairShop.OpeningHours, openingHours =>
        {
            ConfigureDay(openingHours.OwnsOne(oph => oph.Monday));
            ConfigureDay(openingHours.OwnsOne(oph => oph.Tuesday));
            ConfigureDay(openingHours.OwnsOne(oph => oph.Wednesday));
            ConfigureDay(openingHours.OwnsOne(oph => oph.Thursday));
            ConfigureDay(openingHours.OwnsOne(oph => oph.Friday));
            ConfigureDay(openingHours.OwnsOne(oph => oph.Saturday));
            ConfigureDay(openingHours.OwnsOne(oph => oph.Sunday));
        });

        repairShopConfiguration.HasMany(repairShop => repairShop.Workers)
            .WithOne(worker => worker.RepairShop);

        repairShopConfiguration.HasMany(repairShop => repairShop.Reviews)
            .WithOne(review => review.RepairShop);
        
        repairShopConfiguration.HasMany(repairShop => repairShop.Services)
            .WithOne(service => service.RepairShop);
        
        repairShopConfiguration.HasMany(repairShop => repairShop.Repairs)
            .WithOne(repair => repair.RepairShop);
        
        repairShopConfiguration.OwnsMoney(repairShop => repairShop.DiagnosisFee, "DiagnosisFee");

        repairShopConfiguration.Property(repairShop => repairShop.CreatedAt);
    }
}