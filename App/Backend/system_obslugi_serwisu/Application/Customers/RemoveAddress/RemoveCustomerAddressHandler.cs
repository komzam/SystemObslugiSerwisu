using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.RemoveAddress;

public class RemoveCustomerAddressHandler(IUnitOfWork unitOfWork) : IRequestHandler<RemoveCustomerAddressCommand, OperationResult>
{
    public async Task<OperationResult> Handle(RemoveCustomerAddressCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;

        var removeAddressResult = customerResult.Value.RemoveAddress();
        if (removeAddressResult.IsFailure)
            return removeAddressResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}