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

    public async Task<OperationResult<List<PartCategory>>> GetCategories(List<PartCategoryId> categoryIds)
    {
        try
        {
            return await repairShopContext.PartCategories
                .Where(pc => categoryIds.Contains(pc.Id)).ToListAsync();
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
                return PartCategoryErrors.CategoryNotFound();
            
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

    public async Task<OperationResult> RemovePartCategory(PartCategoryId partCategoryId)
    {
        try
        {
            var category = await repairShopContext.PartCategories.Where(pc => pc.Id == partCategoryId).FirstOrDefaultAsync();
            if (category == null)
                return PartCategoryErrors.CategoryNotFound();    
            
            repairShopContext.PartCategories.Remove(category);
            return OperationResult.Success();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<PaginatedList<Part>>> GetParts(int pageNumber, int pageSize, PartFilter partFilter)
    {
        List<Part> parts;
        int totalCount;
        
        try
        {
            var query = repairShopContext.Parts.AsQueryable();

            query = ApplyFilters(query, partFilter);
            
            parts = await query
                .Include(p => p.Reservations)
                .OrderBy(p => p.Name)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await query.CountAsync();
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

    public async Task<OperationResult<List<Part>>> GetParts(List<PartId> partIds)
    {
        try
        {
            return await repairShopContext.Parts
                .Where(p => partIds.Contains(p.Id)).ToListAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<int>> CountParts(PartFilter partFilter)
    {
        int count;
        
        try
        {
            var query = repairShopContext.Parts.AsQueryable();

            query = ApplyFilters(query, partFilter);
            
            count = await query.CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return count;
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
                .Where(p => p.RepairId == repairId)
                .CountAsync();
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

    public async Task<OperationResult<PaginatedList<PartReservation>>> GetPartReservations(
        PartId partId,
        int pageNumber,
        int pageSize,
        List<ReservationStatus> statuses)
    {
        List<PartReservation> partReservations;
        int totalCount;

        try
        {
            partReservations = await repairShopContext.PartReservations
                .Where(p => p.PartId == partId)
                .Where(p => statuses.Contains(p.Status))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await repairShopContext.PartsNeeded
                .Where(p => p.PartId == partId)
                .CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<PartReservation>
        {
            Items = partReservations,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<OperationResult> AddPartOrder(PartOrder order)
    {
        try
        { 
            await repairShopContext.PartOrders.AddAsync(order);
            return OperationResult.Success();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult> DeletePartOrder(PartOrderId partOrderId)
    {
        try
        {
            var order = await repairShopContext.PartOrders
                .Where(po => po.Id == partOrderId)
                .FirstOrDefaultAsync();

            if (order == null)
                return PartOrderErrors.PartOrderNotFound();
            
            repairShopContext.PartOrders.Remove(order);
            return OperationResult.Success();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<PaginatedList<PartOrder>>> GetPartOrders(int pageNumber, int pageSize)
    {
        List<PartOrder> partOrders;
        int totalCount;

        try
        {
            partOrders = await repairShopContext.PartOrders
                .Include(po => po.Items)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await repairShopContext.PartOrders.CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<PartOrder>
        {
            Items = partOrders,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<OperationResult<PaginatedList<PartOrder>>> GetPartOrders(PartId partId, int pageNumber, int pageSize)
    {
        List<PartOrder> partOrders;
        int totalCount;

        try
        {
            partOrders = await repairShopContext.PartOrders
                .Include(po => po.Items.Where(i => i.PartId == partId))
                .Where( po => po.Items.Any( i => i.PartId == partId ))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await repairShopContext.PartOrders
                .Where( po => po.Items.FirstOrDefault( i => i.PartId == partId ) != null)
                .CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<PartOrder>
        {
            Items = partOrders,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<OperationResult<List<PartOrder>>> GetPartOrders(List<PartOrderId> partOrderIds)
    {
        try
        {
            return await repairShopContext.PartOrders
                .Include(po => po.Items)
                .Where(po => partOrderIds.Contains(po.Id))
                .ToListAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult<PartOrder>> GetPartOrder(PartOrderId partOrderId)
    {
        try
        { 
            var order = await repairShopContext.PartOrders
                .Include(po => po.Items)
                .Where(po =>po.Id == partOrderId)
                .FirstOrDefaultAsync();
            
            if(order == null)
                return PartOrderErrors.PartOrderNotFound();

            return order;
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    private static IQueryable<Part> ApplyFilters(IQueryable<Part> query, PartFilter filter)
    {
        if (filter.Categories != null)
        {
            var categories = filter.Categories.Select(c => new PartCategoryId(c)).ToList();
            query = query.Where(p => categories.Contains(p.CategoryId));
        }
        
        if (filter.StockLevels != null)
        {
            var stockLevels = filter.StockLevels;

            query = query.Where(p =>
                (stockLevels.Contains(StockLevel.Low) && p.Stock <= p.LowStockThreshold)
                || (stockLevels.Contains(StockLevel.Normal) && p.Stock > p.LowStockThreshold)
                || (stockLevels.Contains(StockLevel.OutOfStock) && p.Stock == 0)
            );
        }

        if (filter.NeedsReorder != null)
            query = query.Where(p => p.NeedsReorder == filter.NeedsReorder);

        if (filter.SearchTerm != null)
        {
            var terms = filter.SearchTerm.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            foreach (var t in terms)
            {
                var pattern = $"%{t}%";

                query = query.Where(p =>
                    EF.Functions.ILike(p.Name, pattern) ||
                    EF.Functions.ILike(p.ManufacturerCode, pattern)
                );
            }
        }

        return query;
    }
}