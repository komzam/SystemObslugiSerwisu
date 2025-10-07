namespace system_obslugi_serwisu.Shared;

public sealed record OperationError(string Code, string Message = "")
{
    public static OperationError None()
    {
        return new OperationError(string.Empty);
    }

    public bool Equals(OperationError? other)
    {
        if (other is null) return false;
        
        return Code == other.Code;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Code);
    }
}