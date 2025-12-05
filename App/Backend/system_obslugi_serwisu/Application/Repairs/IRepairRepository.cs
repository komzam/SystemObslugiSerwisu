using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs;

public interface IRepairRepository
{
    public Task<OperationResult<Repair>> GetRepair(RepairId id);
    public Task<OperationResult<List<Repair>>> GetRepairs(List<RepairId> repairIds);
    public Task<OperationResult<PaginatedList<Repair>>> GetCustomersRepairs(CustomerId customerId, int pageNumber, int pageSize);
    public Task<OperationResult> CreateRepair(Repair repair);
    public Task<OperationResult<bool>> RepairTicketNumberExists(TicketNumber ticketNumber);
    public Task<OperationResult<int>> GetRepairShopsRepairCount(RepairShopId repairShopId, RepairStatus? status);
    public Task<OperationResult<PaginatedList<Repair>>> GetRepairShopsRepairs(
        RepairShopId repairShopId,
        RepairFilter filter,
        RepairSortField sortBy,
        SortDirection sortDirection,
        int pageNumber,
        int pageSize);
}