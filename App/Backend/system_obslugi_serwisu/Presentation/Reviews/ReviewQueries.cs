using MediatR;
using system_obslugi_serwisu.Application.Reviews.Get;
using system_obslugi_serwisu.Presentation.Reviews.Dto;
using system_obslugi_serwisu.Presentation.Reviews.Get;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Reviews;


[ExtendObjectType(typeof(Query))]
public class ReviewQueries
{
    public async Task<PaginatedList<ReviewDto>> Reviews([Service] IMediator mediatr, GetReviewsRequest request)
    {
        var reviewListResult = await mediatr.Send(new GetReviewsCommand { 
            RepairShopId = request.RepairShopId,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize 
        });
        
        if(reviewListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(reviewListResult.Error.GetUserMessage())
                .SetCode(reviewListResult.Error.GetUserCode())
                .Build());
        
        return reviewListResult.Value.Map<ReviewDto>(review => ReviewMapper.ToDto(review));
    }
}