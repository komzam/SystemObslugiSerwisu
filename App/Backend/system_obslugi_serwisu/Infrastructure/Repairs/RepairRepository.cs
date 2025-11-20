using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.Errors;
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
            repairs = await databaseContext.Repairs.Where(r => repairIds.Contains(r.Id)).ToListAsync();
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
}