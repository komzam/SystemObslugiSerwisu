using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Shared.Errors;

public static class MoneyErrors
{
    private static readonly string Prefix = "Money";
    
    public static OperationError InvalidAmount(string message = "Invalid amount") => 
        new ($"{Prefix}.InvalidAmount", message);
}