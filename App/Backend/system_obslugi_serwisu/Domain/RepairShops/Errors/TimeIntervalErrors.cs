using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairShops.Errors;

public static class TimeIntervalErrors
{
    private static readonly string Prefix = "TimeInterval";

    public static OperationError InvalidFromTime(string message = "From time is invalid") =>
        new ($"{Prefix}.InvalidFromTime", message);
    
    public static OperationError InvalidToTime(string message = "To time is invalid") =>
        new ($"{Prefix}.InvalidToTime", message);
    
    public static OperationError InvalidInterval(string message = "Invalid time interval") =>
        new ($"{Prefix}.InvalidInterval", message);
}