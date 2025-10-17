using MediatR;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Reviews.Get;

public class GetReviewsCommand : IRequest<OperationResult<PaginatedList<Review>>>
{
    public required Guid RepairShopId { get; init; }
    public required int PageSize { get; init; }
    public required int PageNumber { get; init; }
}