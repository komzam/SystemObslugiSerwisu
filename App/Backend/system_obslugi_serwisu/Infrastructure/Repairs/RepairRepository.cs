using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs;

public class RepairRepository(DatabaseContext databaseContext) : IRepairRepository
{
    public async Task<OperationResult<Repair>> GetRepair(RepairId id)
    {
        Repair? repair;
        
        try
        {
            repair = await databaseContext.Repairs
                .Include(r => r.RepairHistory.OrderBy(rs => rs.StepNumber))
                .Include(r => r.Images)
                .FirstOrDefaultAsync(r => r.Id == id);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }

        if (repair == null)
            return RepairErrors.RepairNotFound();
        
        return repair;
    }

    public async Task<OperationResult<List<Repair>>> GetRepairs(List<RepairId> repairIds)
    {
        List<Repair> repairs;
        
        try
        {
            repairs = await databaseContext.Repairs.Where(r => repairIds.Contains(r.Id))
                .Include(r => r.Images)
                .ToListAsync();
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return repairs;
    }

    public async Task<OperationResult<PaginatedList<Repair>>> GetCustomersRepairs(CustomerId customerId, int pageNumber, int pageSize)
    {
        List<Repair> repairs;
        int totalCount;
        
        try
        {
            repairs = await databaseContext.Repairs
                .Include(r => r.RepairHistory)
                .Include(r => r.Images)
                .OrderByDescending(r => r.CreatedAt)
                .Where(r => r.CustomerId != null && r.CustomerId == customerId)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await databaseContext.Repairs
                .Where(r => r.CustomerId != null && r.CustomerId == customerId).CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<Repair>
        {
            Items = repairs,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<OperationResult> CreateRepair(Repair repair)
    {
        try
        {
            await databaseContext.Repairs.AddAsync(repair);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }

    public async Task<OperationResult<bool>> RepairTicketNumberExists(TicketNumber ticketNumber)
    {
        try
        {
            var count = await databaseContext.Repairs.Where(repair => repair.TicketNumber.Value == ticketNumber.Value).CountAsync();
            return count != 0;
        }
        catch(Exception e){
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<int>> GetRepairShopsRepairCount(RepairShopId repairShopId, RepairStatus? status)
    {
        try
        {
            var countQuery = databaseContext.Repairs.Where(repair => repair.RepairShopId == repairShopId);
            if(status.HasValue)
                countQuery=countQuery.Where(repair => repair.Status == status);
            
            return await countQuery.CountAsync();
        }
        catch(Exception e){
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<PaginatedList<Repair>>> GetRepairShopsRepairs(
        RepairShopId repairShopId,
        RepairFilter filter,
        RepairSortField sortBy,
        SortDirection sortDirection,
        int pageNumber,
        int pageSize)
    {
        List<Repair> repairs;
        int totalCount;

        var query = databaseContext.Repairs.AsQueryable();
        
        try
        {
            query = query
                .Include(r => r.RepairHistory)
                .Include(r => r.Images)
                .Where(r => r.RepairShopId == repairShopId);
            
            query = ApplyFilters(query, filter);
            query = Sort(query, sortBy, sortDirection);
                
            repairs = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await query.CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<Repair>
        {
            Items = repairs,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
    
    private static IQueryable<Repair> ApplyFilters(IQueryable<Repair> query, RepairFilter filter)
    {
        if(filter.Statuses != null)
            query = query.Where(repair => filter.Statuses.Contains(repair.Status));

        if (filter.WorkerIds != null)
        {
            var workerIds = filter.WorkerIds.Select(wid => new WorkerId(wid));
            query = query.Where(repair => workerIds.Contains(repair.AssignedWorkerId));
        }
            
        if (filter.SearchTerm != null)
        {
            var terms = filter.SearchTerm.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            foreach (var t in terms)
            {
                var pattern = $"%{t}%";

                query = query.Where(r =>
                    EF.Functions.ILike(r.DeviceInfo.Manufacturer, pattern) ||
                    EF.Functions.ILike(r.DeviceInfo.Model, pattern) ||
                    EF.Functions.ILike(r.DeviceInfo.SerialNumber, pattern) ||
                    EF.Functions.ILike(r.TicketNumber.Value, pattern) ||
                    EF.Functions.ILike(r.ContactInfo.FullName, pattern)
                );
            }
        }

        return query;
    }

    private static IQueryable<Repair> Sort(IQueryable<Repair> query, RepairSortField sortBy,
        SortDirection sortDirection)
    {
        if (sortBy == RepairSortField.DeviceName)
        {
            return sortDirection == SortDirection.Asc
                ? query.OrderBy(r => r.DeviceInfo.Manufacturer)
                    .ThenBy(r => r.DeviceInfo.Model)
                : query.OrderByDescending(r => r.DeviceInfo.Manufacturer)
                    .ThenByDescending(r => r.DeviceInfo.Model);
        }

        return sortDirection == SortDirection.Asc
            ? query.OrderBy(SelectSortingField(sortBy))
            : query.OrderByDescending(SelectSortingField(sortBy));
    }

    private static Expression<Func<Repair, object>> SelectSortingField(RepairSortField sortBy)
    {
        return sortBy switch
        {
            RepairSortField.Status       => repair => repair.Status,
            RepairSortField.CustomerName => repair => repair.ContactInfo.FullName,
            
            RepairSortField.CreatedAt    => repair => repair.CreatedAt,
        
            RepairSortField.DeviceName   => repair => 
                repair.DeviceInfo.Manufacturer + " " + repair.DeviceInfo.Model,
            
            _ => repair => repair.CreatedAt
        };
    }
}