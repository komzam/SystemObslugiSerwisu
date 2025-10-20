using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared.Errors;

public static class CurrencyErrors
{
    private static string _prefix = "Currency";
    
    public static OperationError CurrencyCodeNotFound(string message = "Currency Code not found") => 
        new ($"{_prefix}.CurrencyCodeNotFound", message);
}