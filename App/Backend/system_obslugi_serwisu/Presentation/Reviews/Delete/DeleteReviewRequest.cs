namespace system_obslugi_serwisu.Presentation.Reviews.Delete;

public class DeleteReviewRequest
{
    public required string RepairShopId { get; set; }
    public required string ReviewId { get; init; }
}