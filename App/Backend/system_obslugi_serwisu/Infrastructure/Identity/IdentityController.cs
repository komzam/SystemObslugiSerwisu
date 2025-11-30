using Microsoft.AspNetCore.Identity;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Identity;

public class IdentityController(UserManager<User> userManager, SignInManager<User> signInManager) : IIdentityController
{
    public async Task<OperationResult> Register(Guid id, string email, string password)
    {
        User user = new User
        {
            Id = id.ToString(),
            Email = email,
            UserName = email
        };
        var result = await userManager.CreateAsync(user, password);
        if(!result.Succeeded)
            return IdentityErrorMapper.Map(result.Errors.First());

        return OperationResult.Success();
    }

    public async Task<OperationResult<Guid>> Login(string email, string password, bool rememberMe)
    {
        var result = await signInManager.PasswordSignInAsync(email, password, rememberMe, true);
        
        if(result.IsLockedOut)
            return IdentityErrors.LockedOut();

        if (result.IsNotAllowed)
            return IdentityErrors.NotAllowed();
        
        if (!result.Succeeded)
            return IdentityErrors.InvalidCredentials();
        
        var user = await signInManager.UserManager.FindByNameAsync(email);
        if (!Guid.TryParse(user?.Id, out var userId))
            return IdentityErrors.UnknownError();
        
        return userId;
    }
    
    public async Task<OperationResult> Logout()
    {
        await signInManager.SignOutAsync();
        return OperationResult.Success();
    }

    public async Task<OperationResult> ChangePassword(Guid id, string currentPassword, string newPassword)
    {
        var user = await userManager.FindByIdAsync(id.ToString());
        if(user == null)
            return IdentityErrors.UserNotFound();

        var changePasswordResult = await userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        if(!changePasswordResult.Succeeded)
            return IdentityErrorMapper.Map(changePasswordResult.Errors.First());
        
        return OperationResult.Success();
    }

    public async Task<OperationResult> ChangeEmail(Guid id, string password, string newEmail)
    {
        var user = await userManager.FindByIdAsync(id.ToString());
        if(user == null)
            return IdentityErrors.UserNotFound();
        
        if(!await userManager.CheckPasswordAsync(user, password))
            return IdentityErrors.InvalidCredentials();
        
        var emailChangeToken = await userManager.GenerateChangeEmailTokenAsync(user, newEmail);

        var changeEmailResult = await userManager.ChangeEmailAsync(user, newEmail, emailChangeToken);
        if(!changeEmailResult.Succeeded)
            return IdentityErrorMapper.Map(changeEmailResult.Errors.First());
        
        var changeUsernameResult = await userManager.SetUserNameAsync(user, newEmail);
        if(!changeUsernameResult.Succeeded)
            return IdentityErrorMapper.Map(changeEmailResult.Errors.First());
        
        return OperationResult.Success();
    }
}