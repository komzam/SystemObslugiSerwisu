using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.RepairShops.Errors;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.RepairShops;

public class RepairShopRepository(DatabaseContext databaseContext) : IRepairShopRepository
{
    public Task<OperationResult<RepairShop>> Get(RepairShopId id)
    {
        return Get(id, new RepairShopInclude());
    }

    public async Task<OperationResult<RepairShop>> Get(RepairShopId id, RepairShopInclude repairShopInclude)
    {
        RepairShop? repairShop;

        var query = databaseContext.RepairShops.AsQueryable();

        if (repairShopInclude.Reviews)
            query = query.Include(rs => rs.Reviews);

        if (repairShopInclude.Services)
            query = query.Include(rs => rs.Services);

        try
        {
            repairShop = await query.FirstOrDefaultAsync(repairshop => repairshop.Id == id);
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        if (repairShop == null)
            return RepairShopErrors.RepairShopNotFound();
        
        return repairShop;
    }

    public async Task<OperationResult<PaginatedList<RepairShop>>> SearchByName(string name, int pageNumber, int pageSize)
    {
        List<RepairShop> repairShops;
        int totalCount;
        string nameLower = name.ToLower();
        
        try
        {
            repairShops = await databaseContext.RepairShops
                .Where(rs => rs.Name.ToLower().Contains(nameLower))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await databaseContext.RepairShops
                .Where(rs => rs.Name.ToLower().Contains(nameLower)).CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<RepairShop>
        {
            Items = repairShops,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}