using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Reviews.Get;

public class GetReviewsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetReviewsCommand, OperationResult<PaginatedList<Review>>>
{
    public async Task<OperationResult<PaginatedList<Review>>> Handle(GetReviewsCommand request, CancellationToken cancellationToken)
    {
        var reviewListResult = await unitOfWork.ReviewRepository.Get(new RepairShopId(request.RepairShopId),
                                                                                    request.PageNumber,
                                                                                    request.PageSize);
        if (reviewListResult.IsFailure)
            return reviewListResult.Error;
        
        return reviewListResult.Value;
    }
}