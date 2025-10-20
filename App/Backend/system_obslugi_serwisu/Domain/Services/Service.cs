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
    public Money Price { get; private set; }
    
    private Service() { }

    private Service(RepairShop repairShop, string name, Money price)
    {
        Id = Guid.NewGuid();
        RepairShop = repairShop;
        Name = name;
        Price = price;
    }

    private static OperationResult ValidateInput(string name)
    {
        if (name.Length > NameMaxLength)
            return ServiceErrors.NameTooLong();
        
        if (String.IsNullOrWhiteSpace(name))
            return ServiceErrors.InvalidName();
        
        return OperationResult.Success();
    }

    public static OperationResult<Service> Create(RepairShop repairShop, string name, decimal price, CurrencyCode currencyCode)
    {
        name = name.Trim();
        
        var validationResult = ValidateInput(name);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        var moneyResult = Money.Create(price, currencyCode);
        if(moneyResult.IsFailure)
            return moneyResult.Error;
        
        return new Service(repairShop, name, moneyResult.Value);
    }
}