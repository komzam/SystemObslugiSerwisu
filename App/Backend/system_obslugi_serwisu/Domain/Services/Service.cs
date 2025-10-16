using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Services.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Services;

public class Service
{
    public const int NameMaxLength = 100;
    
    public Guid Id { get; private set; }
    public RepairShop RepairShop { get; private set; }
    public string Name { get; private set; }
    public decimal Price { get; private set; }
    public Currency Currency { get; private set; }
    
    private Service() { }

    private Service(RepairShop repairShop, string name, decimal price, Currency currency)
    {
        Id = Guid.NewGuid();
        RepairShop = repairShop;
        Name = name;
        Price = price;
        Currency = currency;
    }

    private static OperationResult ValidateInput(string name, decimal price)
    {
        if (name.Length > NameMaxLength)
            return ServiceErrors.NameTooLong();
        
        if (String.IsNullOrWhiteSpace(name))
            return ServiceErrors.InvalidName();
        
        if (price < 0)
            return ServiceErrors.InvalidPrice();
        
        return OperationResult.Success();
    }

    public static OperationResult<Service> Create(RepairShop repairShop, string name, decimal price, Currency currency)
    {
        name = name.Trim();
        
        var validationResult = ValidateInput(name, price);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new Service(repairShop, name, price, currency);
    }
}