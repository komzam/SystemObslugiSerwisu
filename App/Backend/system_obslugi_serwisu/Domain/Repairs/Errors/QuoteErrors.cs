using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public class QuoteErrors
{
    private static readonly string Prefix = "Quotes";
    
    public static OperationError CurrencyMismatch(string message = "All money values should have the same currency") => 
        new ($"{Prefix}.CurrencyMismatch", message);
}