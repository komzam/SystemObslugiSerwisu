using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs;

public class RepairMapper
{
    public static RepairDto ToDto(Repair repair)
    {
        return new RepairDto
        {
            Id = repair.Id.ToString(),
            RepairShopId = repair.RepairShop.Id.ToString(),
            Status = repair.Status,
            ContactInfo = ToDto(repair.ContactInfo),
            DeviceInfo = ToDto(repair.DeviceInfo),
            FaultInfo = ToDto(repair.FaultInfo),
            ReturnInfo = ToDto(repair.ReturnInfo),
            CreatedAt = repair.CreatedAt,
        };
    }

    public static ContactInfoDto ToDto(ContactInfo contactInfo)
    {
        return new ContactInfoDto
        {
            FullName = contactInfo.FullName,
            Email = contactInfo.Email.Value,
            PhoneNumber = contactInfo.PhoneNumber.Number,
            PreferredContactMethod = contactInfo.PreferredContactMethod
        };
    }

    public static DeviceInfoDto ToDto(DeviceInfo deviceInfo)
    {
        return new DeviceInfoDto
        {
            DeviceType = deviceInfo.DeviceType,
            Manufacturer = deviceInfo.Manufacturer,
            Model = deviceInfo.Model,
            SerialNumber = deviceInfo.SerialNumber
        };
    }

    public static FaultInfoDto ToDto(FaultInfo faultInfo)
    {
        return new FaultInfoDto
        {
            WhenOccured = faultInfo.WhenOccured,
            HowToReproduce = faultInfo.HowToReproduce,
            Description = faultInfo.Description,
            PreviouslyRepaired = faultInfo.PreviouslyRepaired
        };
    }

    public static ReturnInfoDto ToDto(ReturnInfo returnInfo)
    {
        return new ReturnInfoDto
        {
            ReturnMethod = returnInfo.ReturnMethod,
            ReturnAddress = returnInfo.ReturnAddress==null ? null : SharedMapper.ToDto(returnInfo.ReturnAddress)
        };
    }
}