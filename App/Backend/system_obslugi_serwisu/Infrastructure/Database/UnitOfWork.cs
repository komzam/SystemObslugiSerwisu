using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Infrastructure.Customers;
using system_obslugi_serwisu.Infrastructure.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class UnitOfWork(DatabaseContext databaseContext) : IUnitOfWork
{
    private CustomerRepository? _customerRepository;
    private RepairShopRepository? _repairShopRepository;
    
    public ICustomerRepository CustomerRepository {
        get
        {
            if (_customerRepository == null)
            {
                _customerRepository = new CustomerRepository(databaseContext);
            }
            return _customerRepository;
        }
    }
    
    public IRepairShopRepository RepairShopRepository {
        get
        {
            if (_repairShopRepository == null)
            {
                _repairShopRepository = new RepairShopRepository(databaseContext);
            }
            return _repairShopRepository;
        }
    }
    
    public OperationResult SaveChanges()
    {
        try
        {
            databaseContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }
}