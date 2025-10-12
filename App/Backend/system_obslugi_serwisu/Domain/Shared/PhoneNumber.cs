using system_obslugi_serwisu.Domain.Shared.Errors;
using system_obslugi_serwisu.Shared;
using System.Text.RegularExpressions;

namespace system_obslugi_serwisu.Domain.Shared;

public class PhoneNumber : ValueObject
{
    public const int PhoneNumberMaxLength = 20;
    
    public string Value { get; private set; }

    private PhoneNumber() { }
    
    private PhoneNumber(string phoneNumber) => Value = phoneNumber;

    public static OperationResult<PhoneNumber> Create(string phoneNumber, Country country)
    {
        phoneNumber = phoneNumber.Trim();

        if (phoneNumber.Length > PhoneNumberMaxLength)
            return PhoneNumberErrors.PhoneNumberTooLong();

        if (!Regex.IsMatch(phoneNumber, PhoneNumberPatterns.Patterns[country]))
            return PhoneNumberErrors.InvalidPhoneNumber();
        
        return new PhoneNumber(phoneNumber);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}
