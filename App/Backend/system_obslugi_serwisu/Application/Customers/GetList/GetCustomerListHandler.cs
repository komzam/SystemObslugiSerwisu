using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.GetList;

public class GetCustomerListHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetCustomerListCommand, OperationResult<List<Customer>>>
{
    public async Task<OperationResult<List<Customer>>> Handle(GetCustomerListCommand request, CancellationToken cancellationToken)
    {
        var listOfIds = request.CustomerIds.Select(id => new CustomerId(id)).ToList();
        
        return await unitOfWork.CustomerRepository.GetCustomers(listOfIds);
    }
}