using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.Register;

public class RegisterCustomerHandler(IUnitOfWork unitOfWork, IIdentityController identityController) : IRequestHandler<RegisterCustomerCommand, OperationResult<Customer>>
{
    public async Task<OperationResult<Customer>> Handle(RegisterCustomerCommand request, CancellationToken cancellationToken)
    {
        var customerResult = Customer.Create(new()
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            CompanyName = request.CompanyName,
            IsBusiness = request.IsBusiness,
            TaxIdNumber = request.TaxIdNumber,
            CreatedAt = DateTimeOffset.UtcNow
        });
        if(customerResult.IsFailure)
            return customerResult.Error;

        var customer = customerResult.Value;
        
        var createCustomerResult = await unitOfWork.CustomerRepository.CreateCustomer(customer);
        if(createCustomerResult.IsFailure)
            return createCustomerResult.Error;

        var createAuthUserResult = await identityController.Register(customer.Id.Value, customer.Email.Value, request.Password);
        if(createAuthUserResult.IsFailure)
            return createAuthUserResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return customer;
    }
}