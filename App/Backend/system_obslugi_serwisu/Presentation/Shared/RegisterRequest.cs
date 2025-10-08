namespace system_obslugi_serwisu.Presentation.Shared;

public class RegisterRequest
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required bool IsBusiness { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? CompanyName { get; init; }
    public string? TaxIdNumber { get; init; }
}