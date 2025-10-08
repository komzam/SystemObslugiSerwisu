using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Database;

public static class DatabaseErrors
{
    private static readonly string Prefix = "Database";
    
    public static OperationError UnknownError(string message = "Unknown Error") =>
        new ($"{Prefix}.UnknownError", message, false);
}