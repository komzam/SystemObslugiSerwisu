namespace system_obslugi_serwisu.Shared;

public sealed record OperationError(string Code, string Message = "", bool DisplayToUser = true)
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

    public string GetUserCode()
    {
        if (DisplayToUser)
            return Code;
        return "App.UnknownError";
    }
    
    public string GetUserMessage()
    {
        if (DisplayToUser)
            return Message;
        return "An unknown server error occurred. Please try again later.";
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Code);
    }
}