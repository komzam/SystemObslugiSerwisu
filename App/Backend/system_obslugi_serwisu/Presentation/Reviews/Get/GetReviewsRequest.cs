namespace system_obslugi_serwisu.Presentation.Reviews.Get;

public class GetReviewsRequest
{
    public required string RepairShopId { get; init; }
    public required int PageSize { get; set; }
    public required int PageNumber { get; set; }
}