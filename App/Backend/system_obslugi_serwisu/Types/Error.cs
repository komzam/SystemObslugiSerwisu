namespace system_obslugi_serwisu.Types;

public sealed record Error(string Code, string? Message = null)
{
    public static Error None()
    {
        return new Error(string.Empty);
    }

    public bool Equals(Error? other)
    {
        if (other is null) return false;
        
        return Code == other.Code;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Code);
    }
}