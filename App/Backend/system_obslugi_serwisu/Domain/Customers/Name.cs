using System.ComponentModel.DataAnnotations;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Customers;

public class Name : ValueObject
{
    [MaxLength(50)]
    public string? FirstName {get; private set; }
    
    [MaxLength(50)]
    public string? LastName {get; private set;}
    
    [MaxLength(100)]
    public string? CompanyName {get; private set;}
    
    public string DisplayName {
        get
        {
            if(CompanyName != null)
                return CompanyName;
            
            return $"{FirstName} {LastName}";
        }
    }
    
    private Name() { } // For EF Core

    private Name(string? firstName, string? lastName, string? companyName = null)
    {
        FirstName = firstName;
        LastName = lastName;
        CompanyName = companyName;
    }
    
    public static OperationResult<Name> Create(string firstName, string lastName)
    {
        firstName = firstName.Trim();
        lastName = lastName.Trim();
        
        if (string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(lastName))
            return CustomerErrors.InvalidName();
        
        if (firstName.Length > 50 || lastName.Length > 50)
            return CustomerErrors.NameTooLong();
        
        return new Name(firstName, lastName);
    }

    public static OperationResult<Name> Create(string companyName)
    {
        companyName = companyName.Trim();
        
        if (string.IsNullOrWhiteSpace(companyName))
            return CustomerErrors.InvalidName();
        
        if (companyName.Length > 100)
            return CustomerErrors.NameTooLong();
        
        return new Name(null, null, companyName);
    }


    public override IEnumerable<object> GetAtomicValues()
    {
        yield return FirstName ?? String.Empty;
        yield return LastName ?? String.Empty;
        yield return CompanyName ?? String.Empty;
    }
}