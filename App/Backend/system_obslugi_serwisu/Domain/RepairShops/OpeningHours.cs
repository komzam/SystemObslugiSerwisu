namespace system_obslugi_serwisu.Domain.RepairShops;

public class OpeningHours
{
    public TimeInterval? Monday { get; set; }
    public TimeInterval? Tuesday { get; set; }
    public TimeInterval? Wednesday { get; set; }
    public TimeInterval? Thursday { get; set; }
    public TimeInterval? Friday { get; set; }
    public TimeInterval? Saturday { get; set; }
    public TimeInterval? Sunday { get; set; }
}