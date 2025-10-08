using MediatR;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.Logout;

public class LogoutCustomerHandler(IIdentityController identityController) : IRequestHandler<LogoutCustomerCommand, OperationResult>
{
    public async Task<OperationResult> Handle(LogoutCustomerCommand request, CancellationToken cancellationToken)
    {
        var logoutResult = await identityController.Logout();

        if (logoutResult.IsFailure)
            return logoutResult.Error;
        
        return OperationResult.Success();
    }
}