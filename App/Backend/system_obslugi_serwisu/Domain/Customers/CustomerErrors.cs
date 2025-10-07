using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Customers;

public record CustomerErrors
{
    private static string _prefix = "Customers";

    public static OperationError UserNotFound(string message = "Customer not found") =>
        new ($"{_prefix}.CustomerNotFound", message);
}