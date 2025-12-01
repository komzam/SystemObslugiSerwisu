using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Conversations;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Infrastructure.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs;

public class RepairEntityTypeConfiguration : IEntityTypeConfiguration<Repair>
{
    public void Configure(EntityTypeBuilder<Repair> repairConfiguration)
    {
        repairConfiguration.HasKey(repair => repair.Id);
        repairConfiguration.Property(repair => repair.Id)
            .HasConversion(
                id => id.Value,
                value => new RepairId(value)
            )
            .ValueGeneratedNever();

        repairConfiguration.OwnsOne(repair => repair.TicketNumber, ticketNumber =>
        {
            ticketNumber.Property(tn => tn.Value).HasMaxLength(TicketNumber.TicketNumberMaxLength);
        });
        
        repairConfiguration.Property(repair => repair.RepairShopId)
            .HasConversion(
                id => id.Value,
                value => new RepairShopId(value));

        repairConfiguration.Property(repair => repair.CustomerId)
            .HasConversion(
                id => id == null ? (Guid?)null : id.Value,
                value => value == null ? null : new CustomerId(value.Value));
        
        repairConfiguration.Property(repair => repair.ConversationId)
            .HasConversion(
                id => id == null ? (Guid?)null : id.Value,
                value => value == null ? null : new ConversationId(value.Value));
        
        repairConfiguration.Property(repair => repair.AssignedWorkerId)
            .HasConversion(
                id => id == null ? (Guid?)null : id.Value,
                value => value == null ? null : new WorkerId(value.Value));
        
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

        repairConfiguration.HasMany(repair => repair.Images);
    }
}