using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Reviews.Add;

public class AddReviewCommand : IRequest<OperationResult>
{
    public required Guid RepairShopId { get; set; }
    public required Guid CustomerId { get; set; }
    public required int Rating { get; set; }
    public required string? Comment { get; set; }
}