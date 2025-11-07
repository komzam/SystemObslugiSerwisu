namespace system_obslugi_serwisu.Presentation.Reviews.Dto;

public class ReviewAuthorDto
{
    [GraphQLIgnore]
    public required Guid Id { get; set; }
    public required string Name { get; set; }
}