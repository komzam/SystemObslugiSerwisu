using MediatR;
using system_obslugi_serwisu.Application.Workers.GetList;
using system_obslugi_serwisu.Presentation.Workers.Dto;

namespace system_obslugi_serwisu.Presentation.Workers;

public class WorkerBatchDataLoader: BatchDataLoader<Guid, WorkerDto>
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    
    public WorkerBatchDataLoader(IServiceScopeFactory serviceScopeFactory,IBatchScheduler batchScheduler, DataLoaderOptions options) : base(batchScheduler, options)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task<IReadOnlyDictionary<Guid, WorkerDto>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        await using var scope = _serviceScopeFactory.CreateAsyncScope();
        
        var scopedMediator = scope.ServiceProvider.GetRequiredService<IMediator>();
        
        var workerListResult = await scopedMediator.Send(new GetWorkerListCommand
        {
            WorkerIds = keys.ToList()
        });
        
        if(workerListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(workerListResult.Error.GetUserMessage())
                .SetCode(workerListResult.Error.GetUserCode())
                .Build());

        var workerList = workerListResult.Value.Select(WorkerMapper.ToDto);

        return workerList.ToDictionary(r => r.Id);
    }
}