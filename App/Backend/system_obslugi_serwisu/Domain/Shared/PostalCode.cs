using system_obslugi_serwisu.Shared;
using System.Text.RegularExpressions;
using system_obslugi_serwisu.Domain.Shared.Errors;

namespace system_obslugi_serwisu.Domain.Shared;

public class PostalCode : ValueObject
{
    public const int PostalCodeMaxLength = 20;
    
    public string Value { get; private set; }
    
    private PostalCode() { }
    
    private PostalCode(string postalCode)
    {
        Value = postalCode;
    }

    public static OperationResult<PostalCode> Create(string postalCode, Country country)
    {
        postalCode = postalCode.Trim();

        if (postalCode.Length > PostalCodeMaxLength)
            return AddressErrors.PostalCodeTooLong();

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