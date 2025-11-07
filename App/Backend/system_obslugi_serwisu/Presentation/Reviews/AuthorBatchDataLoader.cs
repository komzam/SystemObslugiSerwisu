using MediatR;
using system_obslugi_serwisu.Application.Customers.GetList;
using system_obslugi_serwisu.Presentation.Reviews.Dto;

namespace system_obslugi_serwisu.Presentation.Reviews;

public class AuthorBatchDataLoader : BatchDataLoader<Guid, ReviewAuthorDto>
{
    private readonly IMediator _mediatr;
    
    public AuthorBatchDataLoader([Service] IMediator mediatr,IBatchScheduler batchScheduler, DataLoaderOptions options) : base(batchScheduler, options)
    {
        _mediatr = mediatr;
    }

    protected override async Task<IReadOnlyDictionary<Guid, ReviewAuthorDto>> LoadBatchAsync(IReadOnlyList<Guid> keys, CancellationToken cancellationToken)
    {
        var customerListResult = await _mediatr.Send(new GetCustomerListCommand
        {
            CustomerIds = keys.ToList()
        });
        
        if(customerListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(customerListResult.Error.GetUserMessage())
                .SetCode(customerListResult.Error.GetUserCode())
                .Build());

        var authorList = customerListResult.Value.Select(c => ReviewMapper.ToDto(c));

        return authorList.ToDictionary(c => c.Id);
    }
}