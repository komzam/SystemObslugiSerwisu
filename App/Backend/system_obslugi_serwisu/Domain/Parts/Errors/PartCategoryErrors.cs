using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Errors;

public static class PartCategoryErrors
{
    private static readonly string Prefix = "PartCategories";
    
    public static OperationError CategoryNotFound(string message = "Part category not found") =>
        new ($"{Prefix}.CategoryNotFound", message);
    
    public static OperationError InvalidName(string message = "Invalid part category name") =>
        new ($"{Prefix}.InvalidName", message);
    
    public static OperationError NameTooLong(string message = "Part category name is too long") =>
        new ($"{Prefix}.NameTooLong", message);
    
    public static OperationError HasAssignedParts(string message = "Part category has assigned parts") =>
        new ($"{Prefix}.HasAssignedParts", message);
}