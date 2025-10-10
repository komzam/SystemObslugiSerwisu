using System.ComponentModel.DataAnnotations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Customers;

public class Tin : ValueObject
{
    public const int TinMaxLength = 20;
    
    public string Value { get; private set;}

    private Tin() { }

    private Tin(string tin)
    {
        Value = tin;
    }

    public static OperationResult<Tin> Create(string tin)
    {
        tin = tin.Trim();
        
        if (string.IsNullOrWhiteSpace(tin))
            return CustomerErrors.InvalidTin();

        if (tin.Length > TinMaxLength)
            return CustomerErrors.TinTooLong();
        
        return new Tin(tin);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}