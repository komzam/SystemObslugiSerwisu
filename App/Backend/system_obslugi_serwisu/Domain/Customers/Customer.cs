using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;
using system_obslugi_serwisu.Domain.Customers.Errors;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Users;

namespace system_obslugi_serwisu.Domain.Customers;

public record CustomerData
{
    public required Guid Id { get; init; }
    public required string Email { get; init; }
    public required bool IsBusiness { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? CompanyName { get; init; }
    public string? TaxIdNumber { get; init; }
    public ContactMethod? PreferredContactMethod { get; init; }
    public ReturnMethod? PreferredReturnMethod { get; init; }
    public Address? Address { get; init; }
}

public record CustomerId(Guid Value);

public class Customer : User
{
    public CustomerId Id { get; private set; }
    public Email Email { get; private set; }
    public Name Name { get; private set; }
    public bool IsBusiness { get; private set; }
    public PhoneNumber? Phone { get; private set; }
    public Tin? TaxIdNumber { get; private set; }
    public ContactMethod? PreferredContactMethod { get; private set; }
    public ReturnMethod? PreferredReturnMethod { get; private set; }
    public Address? Address { get; private set; }
    public List<Repair> Repairs { get; private set; } = new List<Repair>();
    public DateTimeOffset CreatedAt { get; private set; }

    private Customer() { }

    private Customer(Guid id, Email email, Name name, bool isBusiness, Tin? taxIdNumber,
        ContactMethod? preferredContactMethod, ReturnMethod? preferredReturnMethod, Address? address, DateTimeOffset createdAt)
    {
        Id = new CustomerId(id);
        Email = email;
        Name = name;
        IsBusiness = isBusiness;
        TaxIdNumber = taxIdNumber;
        PreferredContactMethod = preferredContactMethod;
        PreferredReturnMethod = preferredReturnMethod;
        Address = address;
        CreatedAt = createdAt;
    }

    public static OperationResult<Customer> Create(CustomerData data)
    {
        data = TrimValues(data);
        
        var emailResult = Email.Create(data.Email);
        if(emailResult.IsFailure)
            return emailResult.Error;

        OperationResult<Name> nameResult;
        OperationResult<Tin>? tinResult = null;
        
        if (data.IsBusiness)
        {
            if (data.CompanyName == null)
                return CustomerErrors.InvalidName();
            nameResult = Name.Create(data.CompanyName);

            if (data.TaxIdNumber == null)
                return CustomerErrors.InvalidTin();
            tinResult = Tin.Create(data.TaxIdNumber);
        }
        else
        {
            if(data.FirstName == null || data.LastName == null)
                return CustomerErrors.InvalidName();
            nameResult = Name.Create(data.FirstName, data.LastName);
        }

        if (nameResult.IsFailure)
            return nameResult.Error;
        
        if(tinResult?.IsFailure == true)
            return tinResult.Error;

        return new Customer(data.Id, emailResult.Value, nameResult.Value, data.IsBusiness, tinResult?.Value,
            data.PreferredContactMethod, data.PreferredReturnMethod, data.Address, data.CreatedAt);
    }
    
    private static CustomerData TrimValues(CustomerData data)
    {
        return data with
        {
            Email = data.Email.Trim(),
            FirstName = data.FirstName?.Trim(),
            LastName = data.LastName?.Trim(),
            CompanyName = data.CompanyName?.Trim(),
            TaxIdNumber = data.TaxIdNumber?.Trim()
        };
    }

    public OperationResult ChangeEmail(string newEmail)
    {
        var emailResult = Email.Create(newEmail);
        if (emailResult.IsFailure)
            return emailResult.Error;
        
        Email = emailResult.Value;
        
        return OperationResult.Success();
    }

    public OperationResult ChangePhoneNumber(string newPhoneNumber, string regionCode)
    {
        var phoneNumberResult = PhoneNumber.Create(newPhoneNumber, regionCode);
        if(phoneNumberResult.IsFailure)
            return phoneNumberResult.Error;
        
        Phone = phoneNumberResult.Value;
        
        return OperationResult.Success();
    }
}