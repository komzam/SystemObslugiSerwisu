namespace system_obslugi_serwisu.Presentation.Auth.ChangePassword;

public class ChangePasswordRequest
{
    public required string CurrentPassword { get; set; }
    public required string NewPassword { get; set; }
}