namespace system_obslugi_serwisu.Presentation.Auth.ChangeEmail;

public class ChangeEmailRequest
{
    public required string Password { get; set; }
    public required string NewEmail { get; set; }
}