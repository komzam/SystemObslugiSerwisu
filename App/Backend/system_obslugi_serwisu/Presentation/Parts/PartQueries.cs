using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Parts.Get;
using system_obslugi_serwisu.Application.Parts.GetCategories;
using system_obslugi_serwisu.Application.Parts.GetList;
using system_obslugi_serwisu.Application.Parts.GetNeeded;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.Parts.Dto;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Parts;

[ExtendObjectType(typeof(Query))]
public class PartQueries
{
    [Authorize]
    [SetTenantMiddleware]
    public async Task<List<PartCategoryDto>> PartCategories([Service] IMediator mediatr)
    {
        var categoriesResult = await mediatr.Send(new GetPartCategoriesCommand());

        if(categoriesResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(categoriesResult.Error.GetUserMessage())
                .SetCode(categoriesResult.Error.GetUserCode())
                .Build());

        return categoriesResult.Value.Select(PartMapper.ToDto).ToList();
    }
    
    [Authorize]
    [SetTenantMiddleware]
    public async Task<PaginatedList<PartDto>> Parts([Service] IMediator mediatr, int pageNumber, int pageSize)
    {
        var partsResult = await mediatr.Send(new GetPartListCommand
        {
            PageNumber = pageNumber,
            PageSize = pageSize
        });

        if(partsResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(partsResult.Error.GetUserMessage())
                .SetCode(partsResult.Error.GetUserCode())
                .Build());

        return partsResult.Value.Map(PartMapper.ToDto);
    }
    
    [Authorize]
    [SetTenantMiddleware]
    public async Task<PartDto> Part([Service] IMediator mediatr, Guid partId)
    {
        var partResult = await mediatr.Send(new GetPartCommand
        {
            PartId = partId
        });

        if(partResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(partResult.Error.GetUserMessage())
                .SetCode(partResult.Error.GetUserCode())
                .Build());

        return PartMapper.ToDto(partResult.Value);
    }
    
    [Authorize]
    [SetTenantMiddleware]
    public async Task<PaginatedList<PartNeededDto>> PartsNeeded([Service] IMediator mediatr, Guid repairId, int pageNumber, int pageSize)
    {
        var partsResult = await mediatr.Send(new GetNeededPartsCommand
        {
            RepairId = repairId,
            PageNumber = pageNumber,
            PageSize = pageSize
        });

        if(partsResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(partsResult.Error.GetUserMessage())
                .SetCode(partsResult.Error.GetUserCode())
                .Build());

        return partsResult.Value.Map(PartMapper.ToDto);
    }
}