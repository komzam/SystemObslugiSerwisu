using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Reviews.Errors;

public static class ReviewErrors
{
    private static readonly string Prefix = "Reviews";
    
    public static OperationError ReviewNotFound(string message = "Review not found") => 
        new ($"{Prefix}.ReviewNotFound", message);
    
    public static OperationError ReviewAccessDenied(string message = "Review access denied") =>
        new ($"{Prefix}.ReviewAccessDenied", message);
    
    public static OperationError InvalidRating(string message = "Invalid rating") => 
        new ($"{Prefix}.InvalidRating", message);
    
    public static OperationError CommentTooLong(string message = "The comment is too long") => 
        new ($"{Prefix}.CommentTooLong", message);
    
}