using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs;

public interface IRepairRepository
{
    public Task<OperationResult<Repair>> GetRepair(RepairId id);
    public Task<OperationResult<PaginatedList<Repair>>> GetCustomersRepairs(CustomerId customerId, int pageNumber, int pageSize);
    public Task<OperationResult> CreateRepair(Repair repair);
}