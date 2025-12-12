using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Errors;

public static class PartNeededErrors
{
    private static readonly string Prefix = "PartsNeeded";
    
    public static OperationError InvalidQuantity(string message = "Invalid parts needed quantity") =>
        new ($"{Prefix}.InvalidQuantity", message);
}