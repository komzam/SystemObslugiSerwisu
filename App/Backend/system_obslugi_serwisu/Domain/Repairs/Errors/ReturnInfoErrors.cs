using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public static class ReturnInfoErrors
{
    private static readonly string Prefix = "ReturnInfo";
    
    public static OperationError ReturnAddressMissing(string message = "The return address is missing") => 
        new ($"{Prefix}.ReturnAddressMissing", message);
}