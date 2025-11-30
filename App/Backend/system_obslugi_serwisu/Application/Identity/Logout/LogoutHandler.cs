using MediatR;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity.Logout;

public class LogoutHandler(IIdentityController identityController) : IRequestHandler<LogoutCommand, OperationResult>
{
    public async Task<OperationResult> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        var logoutResult = await identityController.Logout();

        if (logoutResult.IsFailure)
            return logoutResult.Error;
        
        return OperationResult.Success();
    }
}