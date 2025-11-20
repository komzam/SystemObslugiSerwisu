using MediatR;
using system_obslugi_serwisu.Application.Repairs.GetList;
using system_obslugi_serwisu.Presentation.Repairs.Dto;

namespace system_obslugi_serwisu.Presentation.Repairs;

public class RepairBatchDataLoader: BatchDataLoader<Guid, RepairDto>
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    
    public RepairBatchDataLoader(IServiceScopeFactory serviceScopeFactory,IBatchScheduler batchScheduler, DataLoaderOptions options) : base(batchScheduler, options)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task<IReadOnlyDictionary<Guid, RepairDto>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        await using var scope = _serviceScopeFactory.CreateAsyncScope();
        
        var scopedMediator = scope.ServiceProvider.GetRequiredService<IMediator>();
        
        var repairListResult = await scopedMediator.Send(new GetRepairListCommand
        {
            RepairIds = keys.ToList()
        });
        
        if(repairListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairListResult.Error.GetUserMessage())
                .SetCode(repairListResult.Error.GetUserCode())
                .Build());

        var repairList = repairListResult.Value.Select(RepairMapper.ToDto);

        return repairList.ToDictionary(r => r.Id);
    }
}