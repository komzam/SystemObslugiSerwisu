using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity.ChangeEmail;

public class ChangeEmailHandler(IUnitOfWork unitOfWork, IIdentityController identityController) : IRequestHandler<ChangeEmailCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ChangeEmailCommand request, CancellationToken cancellationToken)
    {
        var changeEmailResult = await identityController.ChangeEmail(request.UserId, request.Password, request.NewEmail);
        if(changeEmailResult.IsFailure)
            return changeEmailResult.Error;
        
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.UserId));
        if (customerResult.IsSuccess)
        {
            var customerChangeEmailResult = customerResult.Value.ChangeEmail(request.NewEmail);
            if (customerChangeEmailResult.IsFailure)
                return customerChangeEmailResult.Error;
        }

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}