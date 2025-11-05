using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Infrastructure.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs;

public class RepairEntityTypeConfiguration : IEntityTypeConfiguration<Repair>
{
    public void Configure(EntityTypeBuilder<Repair> repairConfiguration)
    {
        repairConfiguration.HasKey(repair => repair.Id);
        repairConfiguration.Property(repair => repair.Id).ValueGeneratedNever();

        repairConfiguration.HasOne(repair => repair.RepairShop)
            .WithMany(repairShop => repairShop.Repairs);
        
        repairConfiguration.HasOne(repair => repair.Customer)
            .WithMany(customer => customer.Repairs);

        repairConfiguration.Property(repair => repair.Status);

        repairConfiguration.OwnsOne(repair => repair.ContactInfo,
            contactInfo =>
            {
                contactInfo.Property(ci => ci.FullName).HasMaxLength(ContactInfo.FullNameMaxLength);
                
                contactInfo.OwnsOne(ci => ci.Email, email =>
                {
                    email.Property(e => e.Value);
                });
                
                contactInfo.OwnsOne(ci => ci.PhoneNumber, phoneNumber =>
                {
                    phoneNumber.Property(pn => pn.Number);
                    phoneNumber.Property(pn => pn.RegionCode);
                });

                contactInfo.Property(ci => ci.PreferredContactMethod);
            }
        );

        repairConfiguration.OwnsOne(repair => repair.DeviceInfo, deviceInfo =>
        {
            deviceInfo.Property(di => di.DeviceType);
            deviceInfo.Property(di => di.Manufacturer).HasMaxLength(DeviceInfo.ManufacturerMaxLength);
            deviceInfo.Property(di => di.Model).HasMaxLength(DeviceInfo.ModelMaxLength);
            deviceInfo.Property(di => di.SerialNumber).HasMaxLength(DeviceInfo.SerialNumberMaxLength);
        });

        repairConfiguration.OwnsOne(repair => repair.FaultInfo, faultInfo =>
        {
            faultInfo.Property(fi => fi.WhenOccurred).HasMaxLength(FaultInfo.WhenOccuredMaxLength);
            faultInfo.Property(fi => fi.HowToReproduce).HasMaxLength(FaultInfo.HowToReproduceMaxLength);
            faultInfo.Property(fi => fi.Description).HasMaxLength(FaultInfo.DescriptionMaxLength);
            faultInfo.Property(fi => fi.PreviouslyRepaired);
        });
        
        repairConfiguration.OwnsOne(repair => repair.ReturnInfo, returnInfo =>
        {
            returnInfo.Property(ri => ri.ReturnMethod);
            returnInfo.OwnsOne(ri => ri.ReturnAddress, address =>
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
        });
        
        repairConfiguration.OwnsQuote(repair => repair.Quote);
        repairConfiguration.OwnsMoney(repair => repair.DiagnosisFee, "DiagnosisFee");
        repairConfiguration.OwnsMoney(repair => repair.FinalCost, "FinalCost");
        repairConfiguration.Property(repair => repair.AdditionalComment).HasMaxLength(Repair.AdditionalCommentMaxLength);
        repairConfiguration.Property(repair => repair.CreatedAt);

        repairConfiguration.HasMany(repair => repair.RepairHistory)
            .WithOne(repair => repair.Repair);
    }
}