using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Reviews;

public class Review
{
    public const int CommentMaxLength = 500;

    public Guid Id { get; private set; }
    public RepairShop RepairShop { get; private set; }
    public Customer Author { get; private set; }
    public int Rating { get; private set; }
    public string Comment { get; private set; }

    private Review() { }

    private Review(RepairShop repairShop, Customer author, int rating, string comment)
    {
        Id = Guid.NewGuid();
        RepairShop = repairShop;
        Author = author;
        Rating = rating;
        Comment = comment;
    }

    private static OperationResult ValidateInputs(int rating, string comment)
    {
        if (rating < 1 | rating > 5)
            return ReviewErrors.InvalidRating();

        if (comment.Length > CommentMaxLength)
            return ReviewErrors.CommentTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<Review> Create(RepairShop repairShop,Customer author, int rating, string comment)
    {
        var validationResult = ValidateInputs(rating, comment);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new Review(repairShop, author, rating, comment);
    }

}