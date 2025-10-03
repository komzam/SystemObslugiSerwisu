namespace system_obslugi_serwisu.Types;

public class Username : ValueObject
{
    public string Value { get; }

    private Username(string value)
    {
        Value = value;
    }
    
    public static Result<Username> Create(string username)
    {
        return Result<Username>.Success(new Username(username));
    }
    
    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}