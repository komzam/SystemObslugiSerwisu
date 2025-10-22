using system_obslugi_serwisu.Domain.Shared.Errors;
using system_obslugi_serwisu.Shared;
using PhoneNumbers;
using System.Text.RegularExpressions;

namespace system_obslugi_serwisu.Domain.Shared;

public class PhoneNumber : ValueObject
{
    public const int PhoneNumberMaxLength = 20;
    public const int RegionCodeMaxLength = 2;
    
    public string Number { get; private set; }
    public string RegionCode { get; private set; }

    private PhoneNumber() { }

    private PhoneNumber(string phoneNumber, string regionCode)
    {
        Number = phoneNumber;
        RegionCode = regionCode;
    }

    public static OperationResult<PhoneNumber> Create(string phoneNumber, string regionCode)
    {
        phoneNumber = phoneNumber.Trim();
        regionCode = regionCode.Trim();

        if (phoneNumber.Length > PhoneNumberMaxLength)
            return PhoneNumberErrors.PhoneNumberTooLong();

        try
        {
            var phoneNumberUtil = PhoneNumberUtil.GetInstance();
            var parsedPhoneNumber = phoneNumberUtil.Parse(phoneNumber, regionCode);
            if (!phoneNumberUtil.IsValidNumber(parsedPhoneNumber))
                return PhoneNumberErrors.InvalidPhoneNumber();
        }
        catch
        {
            return PhoneNumberErrors.InvalidPhoneNumber();
        }

        return new PhoneNumber(phoneNumber, regionCode);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Number;
        yield return RegionCode;
    }
}
