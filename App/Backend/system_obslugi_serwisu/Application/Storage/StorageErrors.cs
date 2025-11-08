using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Storage;

public static class StorageErrors
{
    private static readonly string Prefix = "Storage";
    
    public static OperationError UnknownError(string message = "Unknown Error") =>
        new ($"{Prefix}.UnknownError", message, false);
}