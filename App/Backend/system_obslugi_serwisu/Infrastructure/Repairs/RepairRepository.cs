using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Repairs;

public class RepairRepository(DatabaseContext databaseContext) : IRepairRepository
{
    public async Task<OperationResult<Repair>> GetRepair(Guid id)
    {
        Repair? repair;
        
        try
        {
            repair = await databaseContext.Repairs
                .Include(r => r.RepairShop)
                .Include(r => r.Customer)
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

    public async Task<OperationResult<PaginatedList<Repair>>> GetCustomersRepairs(Guid customerId, int pageNumber, int pageSize)
    {
        List<Repair> repairs;
        int totalCount;
        
        try
        {
            repairs = await databaseContext.Repairs
                .Include(r => r.RepairShop)
                .Include(r => r.Customer)
                .Include(r => r.RepairHistory)
                .OrderByDescending(r => r.CreatedAt)
                .Where(r => r.Customer != null && r.Customer.Id == customerId)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await databaseContext.Repairs
                .Where(r => r.Customer != null && r.Customer.Id == customerId).CountAsync();
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