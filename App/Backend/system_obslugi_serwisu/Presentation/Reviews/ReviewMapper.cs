using system_obslugi_serwisu.Domain.Customers;
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
            AuthorId = review.AuthorId.Value,
            Rating = review.Rating,
            Comment = review.Comment
        };
    }
    
    public static ReviewAuthorDto ToDto(Customer customer)
    {
        return new ReviewAuthorDto
        {
            Id = customer.Id.Value,
            Name = customer.Name.SafeDisplayName
        };
    }
}