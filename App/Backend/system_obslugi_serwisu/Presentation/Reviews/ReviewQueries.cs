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
        if (!Guid.TryParse(request.RepairShopId, out var repairShopId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair shop id")
                .SetCode("BadGuid")
                .Build());
        
        var reviewListResult = await mediatr.Send(new GetReviewsCommand { RepairShopId = repairShopId,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize });
        
        if(reviewListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(reviewListResult.Error.GetUserMessage())
                .SetCode(reviewListResult.Error.GetUserCode())
                .Build());
        
        return reviewListResult.Value.Map<ReviewDto>(review => ReviewMapper.ToDto(review));
    }
}