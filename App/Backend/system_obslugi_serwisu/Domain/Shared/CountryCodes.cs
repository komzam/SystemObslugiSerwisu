namespace system_obslugi_serwisu.Domain.Shared;

public static class CountryCodes
{
    public static string? ToCode(Country country) => country switch
    {
        Country.Poland => "PL",
        _ => null
    };
    
    public static Country? ToCountry(string code) => code switch
    {
        "PL" => Country.Poland,
        _ => null
    };
}