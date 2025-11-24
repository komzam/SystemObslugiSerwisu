using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.RemovePhoneNumber;

public class RemoveCustomerPhoneNumberHandler(IUnitOfWork unitOfWork) : IRequestHandler<RemoveCustomerPhoneNumberCommand, OperationResult>
{
    public async Task<OperationResult> Handle(RemoveCustomerPhoneNumberCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;

        var removePhoneNumberResult = customerResult.Value.RemovePhoneNumber();
        if (removePhoneNumberResult.IsFailure)
            return removePhoneNumberResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}