using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public class Quote : ValueObject
{
    public Money LaborCost { get; private set; }
    public Money PartsCost { get; private set; }
    public Money TotalCost => LaborCost + PartsCost;
    public bool? QuoteAccepted { get; set; }
    public DateTimeOffset CreatedAt { get;  private set; }
    
    private Quote() { }
    private Quote(Money laborCost, Money partsCost)
    {
        LaborCost = laborCost;
        PartsCost = partsCost;
        QuoteAccepted = null;
        CreatedAt = DateTimeOffset.UtcNow;
    }
    
    public static OperationResult<Quote> Create(Money laborCost, Money partsCost)
    {
        if(!laborCost.Currency.Equals(partsCost.Currency))
            return QuoteErrors.CurrencyMismatch();
        
        return new Quote(laborCost, partsCost);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return LaborCost;
        yield return PartsCost;
        yield return TotalCost;
    }
}