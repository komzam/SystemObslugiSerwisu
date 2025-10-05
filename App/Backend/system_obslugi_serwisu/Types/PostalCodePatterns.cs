namespace system_obslugi_serwisu.Types;

public static class PostalCodePatterns
{
    public readonly static Dictionary<Country, string> Patterns = new()
    {
        {Country.Poland, @"\d{2}-\d{3}"}
    };
}