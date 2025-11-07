namespace system_obslugi_serwisu.Presentation.Reviews.Dto;

public class ReviewDto
{
    public required string Id { get; init; }
    [GraphQLIgnore]
    public required Guid AuthorId { get; init; }
    public required int Rating { get; init; }
    public string? Comment { get; init; }
}