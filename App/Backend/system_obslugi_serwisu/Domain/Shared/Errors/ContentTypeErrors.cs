using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared.Errors;

public class ContentTypeErrors
{
    private static readonly string Prefix = "ContentTypes";
 
    public static OperationError TypeNotPermitted(string message = "TypeNotPermitted") => 
        new ($"{Prefix}.TypeNotPermitted", message);
}