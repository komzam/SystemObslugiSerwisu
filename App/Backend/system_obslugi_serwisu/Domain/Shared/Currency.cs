using system_obslugi_serwisu.Domain.Shared.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared;

public enum CurrencyCode
{
    Pln,
    Usd
}

public class Currency : ValueObject
{
    public CurrencyCode Code { get; private set; }
    public string Prefix {get; private set;}
    public string Suffix {get; private set;}

    private Currency(CurrencyCode code, string prefix, string suffix)
    {
        Code = code;
        Prefix = prefix;
        Suffix = suffix;
    }
    
    public static readonly Currency Pln = new(CurrencyCode.Pln, "", "zł");
    public static readonly Currency Usd = new(CurrencyCode.Usd, "$", "");

    public static OperationResult<Currency> Create(CurrencyCode code) => code switch
    {
        CurrencyCode.Pln => Pln,
        CurrencyCode.Usd => Usd,
        _ => CurrencyErrors.CurrencyCodeNotFound()
    };

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Code;
        yield return Prefix;
        yield return Suffix;
    }
}