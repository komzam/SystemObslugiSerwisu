using MediatR;
using system_obslugi_serwisu.Application.RepairShops.GetList;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;

namespace system_obslugi_serwisu.Presentation.RepairShops;

public class RepairShopBatchDataLoader : BatchDataLoader<Guid, RepairShopDto>
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    
    public RepairShopBatchDataLoader(IServiceScopeFactory serviceScopeFactory, IBatchScheduler batchScheduler, DataLoaderOptions options) : base(batchScheduler, options)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task<IReadOnlyDictionary<Guid, RepairShopDto>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        await using var scope = _serviceScopeFactory.CreateAsyncScope();
        
        var scopedMediator = scope.ServiceProvider.GetRequiredService<IMediator>();
        
        var repairShopListResult = await scopedMediator.Send(new GetRepairShopListCommand
        {
            RepairShopIds = keys.ToList()
        }, cancellationToken);
        
        if(repairShopListResult.IsFailure)
        {
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairShopListResult.Error.GetUserMessage())
                .SetCode(repairShopListResult.Error.GetUserCode())
                .Build());
        }
        
        var repairShopList = repairShopListResult.Value.Select(RepairShopMapper.ToDto);

        return repairShopList.ToDictionary(rs => rs.Id);
    }
}