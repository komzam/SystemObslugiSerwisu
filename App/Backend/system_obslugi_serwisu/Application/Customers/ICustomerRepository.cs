using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers;

public interface ICustomerRepository
{
    public OperationResult<Customer> GetCustomer(Guid id);
    public OperationResult CreateCustomer(Customer customer);
}