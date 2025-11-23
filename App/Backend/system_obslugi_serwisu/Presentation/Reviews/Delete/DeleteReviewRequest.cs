namespace system_obslugi_serwisu.Presentation.Reviews.Delete;

public class DeleteReviewRequest
{
    public required Guid RepairShopId { get; set; }
    public required Guid ReviewId { get; init; }
}