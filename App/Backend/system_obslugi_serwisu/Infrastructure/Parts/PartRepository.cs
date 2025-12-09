using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Parts;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Parts;

public class PartRepository(RepairShopContext repairShopContext) : IPartRepository
{
    public async Task<OperationResult<List<PartCategory>>> GetCategories()
    {
        try
        {
            return await repairShopContext.PartCategories.ToListAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<PartCategory>> GetCategory(PartCategoryId categoryId)
    {
        try
        {
            var category =  await repairShopContext.PartCategories.FirstOrDefaultAsync(pc => pc.Id == categoryId);
            if(category == null)
                return PartErrors.CategoryNotFound();
            
            return category;
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult> AddPartCategory(PartCategory category)
    {
        try
        { 
            await repairShopContext.PartCategories.AddAsync(category);
            return OperationResult.Success();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<PaginatedList<Part>>> GetParts(int pageNumber, int pageSize)
    {
        List<Part> parts;
        int totalCount;
        
        try
        {
            parts = await repairShopContext.Parts
                .Include(p => p.Reservations)
                .OrderBy(p => p.Name)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await repairShopContext.Parts.CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<Part>
        {
            Items = parts,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<OperationResult<Part>> GetPart(PartId partId)
    {
        try
        {
            var part =  await repairShopContext.Parts
                .Include(p => p.Reservations)
                .FirstOrDefaultAsync(p => p.Id == partId);
            if(part == null)
                return PartErrors.PartNotFound();
            
            return part;
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult> AddPart(Part part)
    {
        try
        { 
            await repairShopContext.Parts.AddAsync(part);
            return OperationResult.Success();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<PaginatedList<PartNeeded>>> GetNeededParts(RepairId repairId, int pageNumber, int pageSize)
    {
        List<PartNeeded> neededParts;
        int totalCount;
        
        try
        {
            neededParts = await repairShopContext.PartsNeeded
                .Where(p => p.RepairId == repairId)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await repairShopContext.PartsNeeded
                .Where(p => p.RepairId == repairId).CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<PartNeeded>
        {
            Items = neededParts,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}