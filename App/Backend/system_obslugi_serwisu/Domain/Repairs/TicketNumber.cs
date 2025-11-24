using System.Security.Cryptography;

namespace system_obslugi_serwisu.Domain.Repairs;

public class TicketNumber
{
    public const int TicketNumberMaxLength = 15;  
    
    public string Value { get; private set; }

    private TicketNumber(string value)
    {
        Value = value;
    }
    
    public static TicketNumber Create()
    {
        return new TicketNumber(TicketCodeGenerator.GenerateFormatted());
    }
}

public static class TicketCodeGenerator
{
    private const string Chars = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; 

    private static string Generate(int length = 8)
    {
        var bytes = new byte[length];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }

        var result = new char[length];
        for (int i = 0; i < length; i++)
        {
            result[i] = Chars[bytes[i] % Chars.Length];
        }

        return new string(result);
    }
    
    public static string GenerateFormatted() 
    {
        string raw = Generate(8); 
        return $"REP-{raw.Substring(0, 4)}-{raw.Substring(4, 4)}";
    }
}