namespace system_obslugi_serwisu.Presentation.Shared;

public class LoginRequest
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required bool RememberMe { get; init; }
}