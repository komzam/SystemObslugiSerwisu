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
        Repair? customer;
        
        try
        {
            customer = await databaseContext.Repairs
                .Include(r => r.RepairShop)
                .Include(r => r.Customer)
                .FirstOrDefaultAsync(r => r.Id == id);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }

        if (customer == null)
            return RepairErrors.RepairNotFound();
        
        return customer;
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