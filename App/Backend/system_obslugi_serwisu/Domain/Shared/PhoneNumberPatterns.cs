namespace system_obslugi_serwisu.Domain.Shared;

public static class PhoneNumberPatterns
{
    public static readonly Dictionary<Country, string> Patterns = new()
    {
        {Country.Poland, @"^+48\d{9}$"}
    };
}