using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Infrastructure.Identity;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairShops;

public record RepairShopData {
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required Address Address { get; set; }
}

public class RepairShop
{
    public const int NameMaxLength = 100;
    
    
    public Guid Id;
    public string Name { get; private set; }
    public Email Email { get; private set; }
    public PhoneNumber Phone { get; private set; }
    public Address Address { get; private set; }
    public OpeningHours OpeningHours { get; private set; }
    public List<Worker>? Workers { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    private RepairShop() { }

    private RepairShop(string name, Email email, PhoneNumber phoneNumber, Address address)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email;
        Phone = phoneNumber;
        Address = address;
    }

    private static RepairShopData TrimData(RepairShopData data)
    {
        return data with
        {
            Name = data.Name.Trim(),
            Email = data.Email.Trim(),
            Phone = data.Phone.Trim()
        };
    }

    private static OperationResult ValidateData(RepairShopData data)
    {
        if (string.IsNullOrWhiteSpace(data.Name))
            return RepairShopErrors.InvalidName();
        
        if (data.Name.Length > NameMaxLength)
            return RepairShopErrors.NameTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<RepairShop> Create(RepairShopData data)
    {
        data = TrimData(data);
        
        var validationResult = ValidateData(data);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        var emailResult = Email.Create(data.Email);
        if(emailResult.IsFailure)
            return emailResult.Error;
        
        var phoneResult = PhoneNumber.Create(data.Phone, data.Address.Country);
        if(phoneResult.IsFailure)
            return phoneResult.Error;
        
        return new RepairShop(data.Name, emailResult.Value, phoneResult.Value, data.Address);
    }
}