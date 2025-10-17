﻿using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Reviews;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Reviews;

public class ReviewRepository(DatabaseContext databaseContext) : IReviewRepository
{
    public async Task<OperationResult<PaginatedList<Review>>> Get(Guid repairShopId, int pageNumber, int pageSize)
    {
        List<Review> reviews;
        int totalCount;
        
        try
        {
            reviews = await databaseContext.Reviews
                .Include(r => r.RepairShop)
                .Include(r => r.Author)
                .Where(review => review.RepairShop.Id == repairShopId)
                .OrderByDescending(review => review.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            totalCount = await databaseContext.Reviews
                .Where(review => review.RepairShop.Id == repairShopId).CountAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }

        return new PaginatedList<Review>
        {
            Items = reviews,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }
}