using MediatR;
using system_obslugi_serwisu.Application.Customers.GetList;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Reviews;
using system_obslugi_serwisu.Presentation.Reviews.Dto;

namespace system_obslugi_serwisu.Presentation.Customers;

public class CustomerBatchDataLoader : BatchDataLoader<Guid, CustomerDto>
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    
    public CustomerBatchDataLoader(IServiceScopeFactory serviceScopeFactory,IBatchScheduler batchScheduler, DataLoaderOptions options) : base(batchScheduler, options)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task<IReadOnlyDictionary<Guid, CustomerDto>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        await using var scope = _serviceScopeFactory.CreateAsyncScope();
        
        var scopedMediator = scope.ServiceProvider.GetRequiredService<IMediator>();
        
        var customerListResult = await scopedMediator.Send(new GetCustomerListCommand
        {
            CustomerIds = keys.ToList()
        }, cancellationToken);
        
        if(customerListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(customerListResult.Error.GetUserMessage())
                .SetCode(customerListResult.Error.GetUserCode())
                .Build());

        var customerList = customerListResult.Value.Select(CustomerMapper.ToDto);

        return customerList.ToDictionary(c => c.Id);
    }
}