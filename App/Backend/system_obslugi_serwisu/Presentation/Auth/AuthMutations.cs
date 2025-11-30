using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using MediatR;
using system_obslugi_serwisu.Application.Identity.Login;
using system_obslugi_serwisu.Application.Identity.Logout;
using system_obslugi_serwisu.Application.Identity.ChangeEmail;
using system_obslugi_serwisu.Application.Identity.ChangePassword;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Presentation.Auth.ChangeEmail;
using system_obslugi_serwisu.Presentation.Auth.ChangePassword;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Auth;

[ExtendObjectType(typeof(Mutation))]
public class AuthMutations
{
    [Authorize]
    public async Task<bool> ChangePassword(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        ChangePasswordRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var changePasswordResult = await mediatr.Send(new ChangePasswordCommand
        {
            UserId = userId,
            CurrentPassword = request.CurrentPassword,
            NewPassword = request.NewPassword
        });
        if (changePasswordResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(changePasswordResult.Error.GetUserMessage())
                .SetCode(changePasswordResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> ChangeEmail(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        ChangeEmailRequest request)
    {
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var changeEmailResult = await mediatr.Send(new ChangeEmailCommand
        {
            UserId = userId,
            Password = request.Password,
            NewEmail = request.NewEmail
        });
        if (changeEmailResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(changeEmailResult.Error.GetUserMessage())
                .SetCode(changeEmailResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [ActingRoleMiddleware]
    public async Task<bool> Login(
        [Service] IMediator mediatr,
        IResolverContext resolverContext,
        LoginRequest request)
    {
        var role = resolverContext.GetLocalState<ActingRole>("actingRole");
        var loginResult = await mediatr.Send(new LoginCommand
        {
            Email = request.Email,
            Password = request.Password,
            RememberMe = request.RememberMe,
            ActingRole = role
        });
        if (loginResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(loginResult.Error.GetUserMessage())
                .SetCode(loginResult.Error.GetUserCode())
                .Build());

        return true;
    }

    public async Task<bool> Logout([Service] IMediator mediatr)
    {
        var logoutResult = await mediatr.Send(new LogoutCommand());
        if (logoutResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(logoutResult.Error.GetUserMessage())
                .SetCode(logoutResult.Error.GetUserCode())
                .Build());

        return true;
    }
}