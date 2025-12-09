using system_obslugi_serwisu.Application.Conversations;
using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Images;
using system_obslugi_serwisu.Application.Parts;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Application.Reviews;
using system_obslugi_serwisu.Application.Services;
using system_obslugi_serwisu.Application.Workers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Infrastructure.Conversations;
using system_obslugi_serwisu.Infrastructure.Customers;
using system_obslugi_serwisu.Infrastructure.Images;
using system_obslugi_serwisu.Infrastructure.Parts;
using system_obslugi_serwisu.Infrastructure.Repairs;
using system_obslugi_serwisu.Infrastructure.RepairShops;
using system_obslugi_serwisu.Infrastructure.Reviews;
using system_obslugi_serwisu.Infrastructure.Services;
using system_obslugi_serwisu.Infrastructure.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Database;

public class UnitOfWork(DatabaseContext databaseContext, RepairShopContextFactory repairShopContextFactory) : IUnitOfWork
{
    private CustomerRepository? _customerRepository;
    private RepairShopRepository? _repairShopRepository;
    private WorkerRepository? _workerRepository;
    private RepairRepository? _repairRepository;
    private ReviewRepository? _reviewRepository;
    private ServiceRepository? _serviceRepository;
    private ConversationRepository? _conversationRepository;
    private ImageRepository? _imageRepository;
    private PartRepository? _partRepository;
    private RepairShopContext? _repairShopContext;
    
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
    
    public IWorkerRepository WorkerRepository {
        get
        {
            if (_workerRepository == null)
            {
                _workerRepository = new WorkerRepository(databaseContext);
            }
            return _workerRepository;
        }
    }
    
    public IRepairRepository RepairRepository {
        get
        {
            if (_repairRepository == null)
            {
                _repairRepository = new RepairRepository(databaseContext);
            }
            return _repairRepository;
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
    
    public IServiceRepository ServiceRepository {
        get
        {
            if (_serviceRepository == null)
            {
                _serviceRepository = new ServiceRepository(databaseContext);
            }
            return _serviceRepository;
        }
    }

    public IConversationRepository ConversationRepository { 
        get
        {
            if (_conversationRepository == null)
            {
                _conversationRepository = new ConversationRepository(databaseContext);
            }
            return _conversationRepository;
        } 
    }
    
    public IImageRepository ImageRepository { 
        get
        {
            if (_imageRepository == null)
            {
                _imageRepository = new ImageRepository(databaseContext);
            }
            return _imageRepository;
        } 
    }
    
    public IPartRepository PartRepository { 
        get
        {
            if (_repairShopContext == null)
                _repairShopContext = repairShopContextFactory.Create();
            
            if (_partRepository == null)
            {
                _partRepository = new PartRepository(_repairShopContext);
            }
            return _partRepository;
        } 
    }

    public async Task<OperationResult> SaveChanges()
    {
        try
        {
            await databaseContext.SaveChangesAsync();
            if(_repairShopContext != null)
                await _repairShopContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }

    public OperationResult SetTenant(RepairShopId repairShopId)
    {
        repairShopContextFactory.RepairShopId = repairShopId.Value.ToString();
        return OperationResult.Success();
    }
}