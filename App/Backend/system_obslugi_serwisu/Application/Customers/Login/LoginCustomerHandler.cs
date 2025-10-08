using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.Login;

public class LoginCustomerHandler(IIdentityController identityController) : IRequestHandler<LoginCustomerCommand, OperationResult>
{
    public async Task<OperationResult> Handle(LoginCustomerCommand request, CancellationToken cancellationToken)
    {
        var loginResult = await identityController.Login(request.Email, request.Password, request.RememberMe);

        if (loginResult.IsFailure)
            return loginResult.Error;
        
        return OperationResult.Success();
    }
}