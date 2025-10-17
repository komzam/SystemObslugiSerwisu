namespace system_obslugi_serwisu.Presentation.Reviews.Add;

public class AddReviewRequest
{
    public required string RepairShopId { get; init; }
    public required int Rating { get; init; }
    public string? Comment { get; init; }
}