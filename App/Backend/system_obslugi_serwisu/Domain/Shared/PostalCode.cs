using System.ComponentModel.DataAnnotations;
using system_obslugi_serwisu.Shared;
using System.Text.RegularExpressions;

namespace system_obslugi_serwisu.Domain.Shared;

public class PostalCode : ValueObject
{
    [MaxLength(20)]
    public string Value { get; private set; }

    private PostalCode() { } // For EF Core
    
    public PostalCode(string postalCode)
    {
        Value = postalCode;
    }

    public static OperationResult<PostalCode> Create(string postalCode, Country country)
    {
        postalCode = postalCode.Trim();

        if (postalCode.Length > 20)
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