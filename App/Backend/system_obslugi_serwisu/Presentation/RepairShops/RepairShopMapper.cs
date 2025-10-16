using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Presentation.Customers;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops;

public class RepairShopMapper
{
    public static RepairShopDto ToDto(RepairShop repairShop)
    {
        return new RepairShopDto
        {
            Id = repairShop.Id.ToString(),
            Name = repairShop.Name,
            Email = repairShop.Email.Value,
            Phone = repairShop.Phone.Value,
            Rating = repairShop.Rating,
            ReviewCount = repairShop.ReviewCount,
            AboutUs = repairShop.AboutUs,
            Address = SharedMapper.ToDto(repairShop.Address),
            OpeningHours = ToDto(repairShop.OpeningHours)
        };
    }

    public static OpeningHoursDto ToDto(OpeningHours openingHours)
    {
        return new OpeningHoursDto
        {
            Monday = openingHours.Monday != null ? ToDto(openingHours.Monday) : null,
            Tuesday = openingHours.Tuesday != null ? ToDto(openingHours.Tuesday) : null,
            Wednesday = openingHours.Wednesday != null ? ToDto(openingHours.Wednesday) : null,
            Thursday = openingHours.Thursday != null ? ToDto(openingHours.Thursday) : null,
            Friday = openingHours.Friday != null ? ToDto(openingHours.Friday) : null,
            Saturday = openingHours.Saturday != null ? ToDto(openingHours.Saturday) : null,
            Sunday = openingHours.Sunday != null ? ToDto(openingHours.Sunday) : null
        };
    }

    public static TimeIntervalDto ToDto(TimeInterval timeInterval)
    {
        return new TimeIntervalDto
        {
            From = timeInterval.From.ToString(),
            To = timeInterval.To.ToString()
        };
    }
}