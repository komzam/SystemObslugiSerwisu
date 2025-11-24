using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangePreferredReturn;

public class ChangeCustomerPreferredReturnHandler(IUnitOfWork unitOfWork) : IRequestHandler<ChangeCustomerPreferredReturnCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ChangeCustomerPreferredReturnCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;

        var changePreferredReturnResult = customerResult.Value.ChangePreferredReturnMethod(request.ReturnMethod);
        if (changePreferredReturnResult.IsFailure)
            return changePreferredReturnResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}