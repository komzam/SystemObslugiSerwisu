using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public class ContactInfo : ValueObject
{
    public const int FullNameMaxLength = 100;
    
    public string FullName { get; private set; }
    public Email Email { get; private set; }
    public PhoneNumber PhoneNumber { get; private set; }
    public ContactMethod PreferredContactMethod { get; private set; }
    
    private ContactInfo() { }

    private ContactInfo(string fullName, Email email, PhoneNumber phoneNumber, ContactMethod preferredContactMethod)
    {
        FullName = fullName;
        Email = email;
        PhoneNumber = phoneNumber;
        PreferredContactMethod = preferredContactMethod;
    }

    private static OperationResult ValidateInput(string fullName)
    {
        if (String.IsNullOrWhiteSpace(fullName))
            return ContactInfoErrors.InvalidFullName();
        
        if(fullName.Length > FullNameMaxLength)
            return ContactInfoErrors.FullNameTooLong();

        return OperationResult.Success();
    }

    public static OperationResult<ContactInfo> Create(string fullName, string email, string phoneNumber, string phoneRegionCode,
        ContactMethod preferredContactMethod)
    {
        fullName = fullName.Trim();
        
        var validationResult = ValidateInput(fullName);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        var emailResult = Email.Create(email);
        if (emailResult.IsFailure)
            return emailResult.Error;
        
        var phoneNumberResult = PhoneNumber.Create(phoneNumber, phoneRegionCode);
        if (phoneNumberResult.IsFailure)
            return phoneNumberResult.Error;
        
        return new ContactInfo(fullName, emailResult.Value, phoneNumberResult.Value, preferredContactMethod);
    }

    public static OperationResult<ContactInfo> Create(string fullName, Email email, PhoneNumber phoneNumber,
        ContactMethod preferredContactMethod)
    {
        fullName = fullName.Trim();
        
        var validationResult = ValidateInput(fullName);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new ContactInfo(fullName, email, phoneNumber, preferredContactMethod);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return FullName;
        yield return Email;
        yield return PhoneNumber;
        yield return PreferredContactMethod;
    }
}