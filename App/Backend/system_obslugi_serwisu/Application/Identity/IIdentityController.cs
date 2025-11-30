using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity;

public interface IIdentityController
{
    public Task<OperationResult> Register(Guid id, string email, string password);
    public Task<OperationResult<Guid>> Login(string email, string password, bool rememberMe);
    public Task<OperationResult> Logout();
    public Task<OperationResult> ChangePassword(Guid id, string currentPassword, string newPassword);
    public Task<OperationResult> ChangeEmail(Guid id, string password, string newEmail);
}