using system_obslugi_serwisu.Domain.RepairShops;

namespace system_obslugi_serwisu.Presentation.RepairShops;

public class OpeningHoursDto
{
    public TimeIntervalDto? Monday { get; set; }
    public TimeIntervalDto? Tuesday { get; set; }
    public TimeIntervalDto? Wednesday { get; set; }
    public TimeIntervalDto? Thursday { get; set; }
    public TimeIntervalDto? Friday { get; set; }
    public TimeIntervalDto? Saturday { get; set; }
    public TimeIntervalDto? Sunday { get; set; }
}