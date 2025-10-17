using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Application.Reviews;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Infrastructure.Customers;
using system_obslugi_serwisu.Infrastructure.RepairShops;
using system_obslugi_serwisu.Infrastructure.Reviews;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class UnitOfWork(DatabaseContext databaseContext) : IUnitOfWork
{
    private CustomerRepository? _customerRepository;
    private RepairShopRepository? _repairShopRepository;
    private ReviewRepository? _reviewRepository;
    
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

    public IReviewRepository ReviewRepository {
        get
        {
            if (_reviewRepository == null)
            {
                _reviewRepository = new ReviewRepository(databaseContext);
            }
            return _reviewRepository;
        }
    }

    public async Task<OperationResult> SaveChanges()
    {
        try
        {
            await databaseContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }
}