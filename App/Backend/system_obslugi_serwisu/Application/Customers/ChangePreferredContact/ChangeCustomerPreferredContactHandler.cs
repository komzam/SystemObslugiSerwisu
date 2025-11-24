using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangePreferredContact;

public class ChangeCustomerPreferredContactHandler(IUnitOfWork unitOfWork) : IRequestHandler<ChangeCustomerPreferredContactCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ChangeCustomerPreferredContactCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;

        var changePreferredContactResult = customerResult.Value.ChangePreferredContactMethod(request.ContactMethod);
        if (changePreferredContactResult.IsFailure)
            return changePreferredContactResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}