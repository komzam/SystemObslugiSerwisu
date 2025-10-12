using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using system_obslugi_serwisu.Domain.Shared.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared;

public class Email : ValueObject
{
    public const int EmailMaxLength = 150; 
    
    public string Value { get; private set; }
    
    private Email() { }
    
    private Email(string email)
    {
        Value = email;
    }

    public static OperationResult<Email> Create(string email)
    {
        email = email.Trim();
        
        if (string.IsNullOrWhiteSpace(email))
            return EmailErrors.InvalidEmail();
        
        if(email.Length > EmailMaxLength)
            return EmailErrors.EmailTooLong();
        
        if(!Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            return EmailErrors.InvalidEmail();
        
        return new Email(email);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}