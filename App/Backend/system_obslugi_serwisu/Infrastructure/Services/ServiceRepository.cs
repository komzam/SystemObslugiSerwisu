using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Services;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Services;

public class ServiceRepository(DatabaseContext databaseContext) : IServiceRepository
{
    public async Task<OperationResult<PaginatedList<Service>>> Get(RepairShopId repairShopId, int pageNumber, int pageSize)
    {
        List<Service> services;
        int totalCount;
        
        try
        {
            services = await databaseContext.Services
                .Where(service => service.RepairShopId == repairShopId)
                .OrderBy(service => service.Name)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await databaseContext.Services
                .Where(service => service.RepairShopId == repairShopId).CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<Service>
        {
            Items = services,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}