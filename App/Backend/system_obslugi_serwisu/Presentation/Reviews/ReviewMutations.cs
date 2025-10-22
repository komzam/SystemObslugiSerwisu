using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Reviews.Add;
using system_obslugi_serwisu.Application.Reviews.Delete;
using system_obslugi_serwisu.Presentation.Reviews.Add;
using system_obslugi_serwisu.Presentation.Reviews.Delete;

namespace system_obslugi_serwisu.Presentation.Reviews;


[ExtendObjectType(typeof(Mutation))]
public class ReviewMutations
{
    [Authorize]
    public async Task<bool> AddReview([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, AddReviewRequest request)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        if (!Guid.TryParse(request.RepairShopId, out var repairShopId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair shop id")
                .SetCode("BadGuid")
                .Build());
        
        var addReviewResult = await mediatr.Send(new AddReviewCommand
        {
            RepairShopId = repairShopId,
            CustomerId = customerId,
            Rating = request.Rating,
            Comment = request.Comment,
        });
        
        if (addReviewResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(addReviewResult.Error.GetUserMessage())
                .SetCode(addReviewResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> DeleteReview([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, DeleteReviewRequest request)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        if (!Guid.TryParse(request.RepairShopId, out var repairShopId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair shop id")
                .SetCode("BadGuid")
                .Build());
        
        if (!Guid.TryParse(request.ReviewId, out var reviewId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid review id")
                .SetCode("BadGuid")
                .Build());
        
        var deleteReviewResult = await mediatr.Send(new DeleteReviewCommand()
        {
            RepairShopId = repairShopId,
            ReviewId = reviewId,
            CustomerId = customerId
        });
        
        if (deleteReviewResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(deleteReviewResult.Error.GetUserMessage())
                .SetCode(deleteReviewResult.Error.GetUserCode())
                .Build());

        return true;
    }
}