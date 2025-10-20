using system_obslugi_serwisu.Domain.Shared.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared;

public class Money : ValueObject
{
    public decimal Value { get; private set; }
    public Currency Currency { get; private set; }
    
    public string FormattedValue => $"{Currency.Prefix}{Value:N2}{Currency.Suffix}";

    private Money() { }
    
    private Money(decimal value, Currency currency)
    {
        Value = value;
        Currency = currency;
    }
    
    public static OperationResult<Money> Create(decimal value, CurrencyCode currencyCode)
    {
        if (value < 0)
            return MoneyErrors.InvalidAmount();
        
        var currencyResult = Currency.Create(currencyCode);
        if(currencyResult.IsFailure)
            return currencyResult.Error;
        
        return new Money(value, currencyResult.Value);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
        yield return Currency;
    }
}