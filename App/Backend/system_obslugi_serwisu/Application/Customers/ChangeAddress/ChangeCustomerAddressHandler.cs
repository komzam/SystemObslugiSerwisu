using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangeAddress;

public class ChangeCustomerAddressHandler(IUnitOfWork unitOfWork) : IRequestHandler<ChangeCustomerAddressCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ChangeCustomerAddressCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;
        
        var changeAddressResult = customerResult.Value.ChangeAddress(new AddressData
        {
            RecipientName = request.RecipientName,
            Street = request.Street,
            BuildingNumber = request.BuildingNumber,
            ApartmentNumber = request.ApartmentNumber,
            City = request.City,
            PostalCode = request.PostalCode,
            Country = request.Country
        });
        if(changeAddressResult.IsFailure)
            return changeAddressResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}