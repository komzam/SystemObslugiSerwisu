using system_obslugi_serwisu.Domain.RepairShops.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairShops;

public class TimeInterval : ValueObject
{
    public TimeOnly From { get; private set; }
    public TimeOnly To { get; private set; }

    private TimeInterval(TimeOnly from, TimeOnly to)
    {
        From = from;
        To = to;
    }

    private static OperationResult CheckInterval(TimeOnly from, TimeOnly to)
    {
        if (from > to)
            return TimeIntervalErrors.InvalidInterval();
        
        return OperationResult.Success();
    }

    public static OperationResult<TimeInterval> Create(string from, string to)
    {
        if(!TimeOnly.TryParse(from, out var start))
            return TimeIntervalErrors.InvalidFromTime();
            
        if(!TimeOnly.TryParse(to, out var end))
            return TimeIntervalErrors.InvalidToTime();
        
        var checkResult = CheckInterval(start, end);
        if(checkResult.IsFailure)
            return checkResult.Error;

        return new TimeInterval(start, end);
    }
    
    public static OperationResult<TimeInterval> Create(TimeOnly from, TimeOnly to)
    {
        var checkResult = CheckInterval(from, to);
        if(checkResult.IsFailure)
            return checkResult.Error;

        return new TimeInterval(from, to);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return From;
        yield return To;
    }
}