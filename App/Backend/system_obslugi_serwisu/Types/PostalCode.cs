using System.Text.RegularExpressions;

namespace system_obslugi_serwisu.Types;

public class PostalCode : ValueObject
{
    public string Value { get; }

    private PostalCode(string postalCode)
    {
        Value = postalCode;
    }

    public static Result<PostalCode> Create(string postalCode, Country country)
    {
        postalCode = postalCode.Trim();

        if (!Regex.IsMatch(postalCode, PostalCodePatterns.Patterns[country]))
        {
            return AddressErrors.InvalidPostalCode();
        }
        
        return new PostalCode(postalCode);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}