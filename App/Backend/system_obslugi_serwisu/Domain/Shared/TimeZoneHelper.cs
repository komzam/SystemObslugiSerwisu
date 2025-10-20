using NodaTime.TimeZones;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared;

public static class TimeZoneHelper
{
    public const int TimeZoneMaxLength = 50; 
    
    public static string IanaIdFromCountry(Country country)
    {
        var countryCode = CountryCodes.ToCode(country);
        if(countryCode == null)
            return "Etc/UTC";
        
        var source = TzdbDateTimeZoneSource.Default;
        
        if(source.ZoneLocations == null)
            return "Etc/UTC";

        var timeZoneId = source.ZoneLocations
            .Where(z => z.CountryCode == countryCode)
            .Select(z => z.ZoneId)
            .Distinct()
            .FirstOrDefault();
        
        if(timeZoneId == null)
            return "Etc/UTC";
        
        return timeZoneId;
    }
}