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

    public async Task<OperationResult> Login(string email, string password, bool rememberMe)
    {
        var result = await signInManager.PasswordSignInAsync(email, password, rememberMe, true);
        
        if(result.IsLockedOut)
            return IdentityErrors.LockedOut();

        if (result.IsNotAllowed)
            return IdentityErrors.NotAllowed();
        
        if (!result.Succeeded)
            return IdentityErrors.InvalidCredentials();
        
        return OperationResult.Success();
    }
    
    public async Task<OperationResult> Logout()
    {
        await signInManager.SignOutAsync();
        return OperationResult.Success();
    }
}