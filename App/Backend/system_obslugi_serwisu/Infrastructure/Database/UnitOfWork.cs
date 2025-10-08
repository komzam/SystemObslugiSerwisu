using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Infrastructure.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class UnitOfWork(DatabaseContext databaseContext) : IUnitOfWork
{
    private CustomerRepository? _customerRepository;
    
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