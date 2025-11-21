using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared.Errors;

public static class ImageErrors
{
    private static readonly string Prefix = "Images";
    
    public static OperationError ImageNotFound(string message = "Image not found") => 
        new ($"{Prefix}.ImageNotFound", message);
}