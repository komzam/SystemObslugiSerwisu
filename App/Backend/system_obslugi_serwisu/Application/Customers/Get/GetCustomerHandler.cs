using MediatR;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.Get;

public class GetCustomerHandler(ICustomerRepository repository) : IRequestHandler<GetCustomerCommand, OperationResult<Customer>>
{
    public Task<OperationResult<Customer>> Handle(GetCustomerCommand request, CancellationToken cancellationToken)
    {
        var customerResult = repository.GetCustomer(request.Id);
        if(customerResult.IsFailure)
            return Task.FromResult(OperationResult<Customer>.Failure(customerResult.Error));
        
        return Task.FromResult(OperationResult<Customer>.Success(customerResult.Value));
    }
}