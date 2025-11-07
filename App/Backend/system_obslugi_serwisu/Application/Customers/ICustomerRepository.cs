using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers;

public interface ICustomerRepository
{
    public Task<OperationResult<Customer>> GetCustomer(CustomerId id);
    public Task<OperationResult<List<Customer>>> GetCustomers(List<CustomerId> customerIds);
    public Task<OperationResult> CreateCustomer(Customer customer);
}