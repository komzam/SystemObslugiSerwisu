using system_obslugi_serwisu.Presentation.Reviews.Dto;

namespace system_obslugi_serwisu.Presentation.Reviews;

[ExtendObjectType(typeof(ReviewDto))]
public class ReviewExtensions
{
    public Task<ReviewAuthorDto?> GetAuthor([Parent] ReviewDto review, AuthorBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(review.AuthorId);
    }
}