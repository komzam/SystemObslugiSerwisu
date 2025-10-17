namespace system_obslugi_serwisu.Presentation.Reviews.Dto;

public class ReviewDto
{
    public required string Id { get; init; }
    public required string AuthorName { get; init; }
    public required int Rating { get; init; }
    public required string Comment { get; init; }
}