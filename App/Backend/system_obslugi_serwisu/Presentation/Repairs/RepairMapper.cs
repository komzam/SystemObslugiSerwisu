using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.Dto.RepairSteps;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs;

public static class RepairMapper
{
    public static RepairDto ToDto(Repair repair)
    {
        return new RepairDto
        {
            Id = repair.Id.Value,
            RepairShopId = repair.RepairShopId.Value,
            ConversationId = repair.ConversationId?.Value,
            Status = repair.Status,
            ContactInfo = ToDto(repair.ContactInfo),
            DeviceInfo = ToDto(repair.DeviceInfo),
            FaultInfo = ToDto(repair.FaultInfo),
            ReturnInfo = ToDto(repair.ReturnInfo),
            AdditionalComment = repair.AdditionalComment,
            RepairHistory = repair.RepairHistory.Select(ToDto).ToList(),
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
            WhenOccurred = faultInfo.WhenOccurred,
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

    public static QuoteDto ToDto(Quote quote)
    {
        return new QuoteDto
        {
            LaborCost = quote.LaborCost.FormattedValue,
            PartsCost = quote.PartsCost.FormattedValue,
            TotalCost = quote.TotalCost.FormattedValue,
            QuoteAccepted = quote.QuoteAccepted
        };
    }

    public static RepairStepDto ToDto(RepairStep repairStep)
    {
        return repairStep switch
        {
            NormalRepairStep nrs => ToDto(nrs),
            PaymentRepairStep prs => ToDto(prs),
            QuoteRepairStep qrs => ToDto(qrs)
        };
    }

    public static NormalRepairStepDto ToDto(NormalRepairStep repairStep)
    {
        return new NormalRepairStepDto
        {
            Id = repairStep.Id,
            Status = repairStep.Status,
            CreatedAt = repairStep.CreatedAt,
            Description = repairStep.Description
        };
    }

    public static PaymentRepairStepDto ToDto(PaymentRepairStep repairStep)
    {
        return new PaymentRepairStepDto
        {
            Id = repairStep.Id,
            Status = repairStep.Status,
            CreatedAt = repairStep.CreatedAt,
            Description = repairStep.Description,
            Amount = repairStep.Amount.FormattedValue,
            Paid = repairStep.Paid,
        };
    }
    
    public static QuoteRepairStepDto ToDto(QuoteRepairStep repairStep)
    {
        return new QuoteRepairStepDto
        {
            Id = repairStep.Id,
            Status = repairStep.Status,
            CreatedAt = repairStep.CreatedAt,
            Description = repairStep.Description,
            Quote = ToDto(repairStep.Quote)
        };
    }
}