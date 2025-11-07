using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Reviews;

public record ReviewId(Guid Value);

public class Review
{
    public const int CommentMaxLength = 500;

    public ReviewId Id { get; private set; }
    public RepairShopId RepairShopId { get; private set; }
    public CustomerId AuthorId { get; private set; }
    public int Rating { get; private set; }
    public string? Comment { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    private Review() { }

    private Review(RepairShopId repairShopId, CustomerId authorId, int rating, string? comment)
    {
        Id = new ReviewId(Guid.NewGuid());
        RepairShopId = repairShopId;
        AuthorId = authorId;
        Rating = rating;
        Comment = comment;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    private static OperationResult ValidateInputs(int rating, string? comment)
    {
        if (rating < 1 | rating > 5)
            return ReviewErrors.InvalidRating();

        if (comment?.Length > CommentMaxLength)
            return ReviewErrors.CommentTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<Review> Create(RepairShopId repairShopId,CustomerId authorId, int rating, string? comment)
    {
        var validationResult = ValidateInputs(rating, comment);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new Review(repairShopId, authorId, rating, comment);
    }

}