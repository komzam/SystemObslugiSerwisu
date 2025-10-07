namespace system_obslugi_serwisu.Domain.Shared;

public static class PostalCodePatterns
{
    public static readonly Dictionary<Country, string> Patterns = new()
    {
        {Country.Poland, @"\d{2}-\d{3}"}
    };
}