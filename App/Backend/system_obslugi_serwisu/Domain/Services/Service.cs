using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Services.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Services;

public record ServiceId(Guid Value);

public class Service
{
    public const int NameMaxLength = 100;
    
    public ServiceId Id { get; private set; }
    public RepairShopId RepairShopId { get; private set; }
    public string Name { get; private set; }
    public Money Price { get; private set; }
    
    private Service() { }

    private Service(RepairShopId repairShopId, string name, Money price)
    {
        Id = new ServiceId(Guid.NewGuid());
        RepairShopId = repairShopId;
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

    public static OperationResult<Service> Create(RepairShopId repairShopId, string name, decimal price, CurrencyCode currencyCode)
    {
        name = name.Trim();
        
        var validationResult = ValidateInput(name);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        var moneyResult = Money.Create(price, currencyCode);
        if(moneyResult.IsFailure)
            return moneyResult.Error;
        
        return new Service(repairShopId, name, moneyResult.Value);
    }
}