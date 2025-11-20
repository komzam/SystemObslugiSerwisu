using system_obslugi_serwisu.Application.Conversations;
using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Images;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Application.Reviews;
using system_obslugi_serwisu.Application.Services;
using system_obslugi_serwisu.Application.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Database;

public interface IUnitOfWork
{
    public ICustomerRepository CustomerRepository { get; }
    public IRepairShopRepository RepairShopRepository { get; }
    public IWorkerRepository WorkerRepository { get; }
    public IRepairRepository RepairRepository { get; }
    public IReviewRepository ReviewRepository { get; }
    public IServiceRepository ServiceRepository { get; }
    public IConversationRepository ConversationRepository { get; }
    public IImageRepository ImageRepository { get; }
    public Task<OperationResult> SaveChanges();
}