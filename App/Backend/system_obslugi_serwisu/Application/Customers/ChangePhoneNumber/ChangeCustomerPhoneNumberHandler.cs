using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangePhoneNumber;

public class ChangeCustomerPhoneNumberHandler(IUnitOfWork unitOfWork) : IRequestHandler<ChangeCustomerPhoneNumberCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ChangeCustomerPhoneNumberCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;

        var changePhoneNumberResult = customerResult.Value.ChangePhoneNumber(request.NewPhoneNumber, request.RegionCode);
        if (changePhoneNumberResult.IsFailure)
            return changePhoneNumberResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}