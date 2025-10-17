using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Presentation.Reviews.Dto;

namespace system_obslugi_serwisu.Presentation.Reviews;

public static class ReviewMapper
{
    public static ReviewDto ToDto(this Review review)
    {
        return new ReviewDto
        {
            Id = review.Id.ToString(),
            AuthorName = review.Author.Name.SafeDisplayName,
            Rating = review.Rating,
            Comment = review.Comment
        };
    }
}