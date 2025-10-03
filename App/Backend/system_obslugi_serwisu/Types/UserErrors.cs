namespace system_obslugi_serwisu.Types;

public record UserErrors
{
    private static string _prefix = "Users";

    public static Error UserNotFound(string message = "User not found") =>
        new ($"{_prefix}.UserNotFound", message);
}