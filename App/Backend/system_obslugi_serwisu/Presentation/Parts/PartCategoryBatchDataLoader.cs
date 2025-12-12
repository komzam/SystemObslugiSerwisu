using System.Security.Claims;
using MediatR;
using system_obslugi_serwisu.Application.Database.SetTenant;
using system_obslugi_serwisu.Application.Parts.Categories.GetListById;
using system_obslugi_serwisu.Presentation.Parts.Dto;

namespace system_obslugi_serwisu.Presentation.Parts;

public class PartCategoryBatchDataLoader : BatchDataLoader<Guid, PartCategoryDto>
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly IHttpContextAccessor _httpContextAccessor;
    
    public PartCategoryBatchDataLoader(IServiceScopeFactory serviceScopeFactory, IHttpContextAccessor httpContextAccessor, IBatchScheduler batchScheduler, DataLoaderOptions options) : base(batchScheduler, options)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _httpContextAccessor = httpContextAccessor;
    }

    protected override async Task<IReadOnlyDictionary<Guid, PartCategoryDto>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        await using var scope = _serviceScopeFactory.CreateAsyncScope();
        
        var scopedMediator = scope.ServiceProvider.GetRequiredService<IMediator>();
        
        var claims = _httpContextAccessor.HttpContext?.User;
        var userIdString = claims?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var setTenantResult = await scopedMediator.Send(new SetTenantCommand{WorkerId = userId});
        if(setTenantResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(setTenantResult.Error.GetUserMessage())
                .SetCode(setTenantResult.Error.GetUserCode())
                .Build());
        
        var categoryListResult = await scopedMediator.Send(new GetPartCategoriesByIdCommand
        {
            CategoryIds = keys.ToList()
        });
        
        if(categoryListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(categoryListResult.Error.GetUserMessage())
                .SetCode(categoryListResult.Error.GetUserCode())
                .Build());

        var categoryList = categoryListResult.Value.Select(PartMapper.ToDto);

        return categoryList.ToDictionary(r => r.Id);
    }
}