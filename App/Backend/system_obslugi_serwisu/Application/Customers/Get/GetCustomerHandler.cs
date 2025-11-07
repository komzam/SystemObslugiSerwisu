using MediatR;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.Get;

public class GetCustomerHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetCustomerCommand, OperationResult<Customer>>
{
    public async Task<OperationResult<Customer>> Handle(GetCustomerCommand request, CancellationToken cancellationToken)
    {
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.Id));
        if(customerResult.IsFailure)
            return customerResult.Error;
        
        return customerResult.Value;
    }
}