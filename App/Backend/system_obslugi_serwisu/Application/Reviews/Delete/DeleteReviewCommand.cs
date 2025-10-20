using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Reviews.Delete;

public class DeleteReviewCommand : IRequest<OperationResult>
{
    public required Guid RepairShopId { get; set; }
    public required Guid ReviewId { get; set; }
    public required Guid CustomerId { get; set; }
}