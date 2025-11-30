using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity.Login;

public class LoginHandler(IUnitOfWork unitOfWork, IIdentityController identityController) : IRequestHandler<LoginCommand, OperationResult>
{
    public async Task<OperationResult> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var loginResult = await identityController.Login(request.Email, request.Password, request.RememberMe);
        if (loginResult.IsFailure)
            return loginResult.Error;

        if (request.ActingRole == ActingRole.Customer)
        {
            var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(loginResult.Value));
            if(customerResult.IsFailure)
                return customerResult.Error;
        }

        if (request.ActingRole == ActingRole.Worker)
        {
            var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(loginResult.Value));
            if(workerResult.IsFailure)
                return workerResult.Error;
        }

        return OperationResult.Success();
    }
}