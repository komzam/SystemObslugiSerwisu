using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Customers;

public class CustomerRepository(DatabaseContext databaseContext) : ICustomerRepository
{
    public OperationResult<Customer> GetCustomer(Guid id)
    {
        Customer? customer;
        
        try
        {
             customer = databaseContext.Customers.FirstOrDefault(c => c.Id == id);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }

        if (customer == null)
            return CustomerErrors.CustomerNotFound();
        
        return customer;
    }

    public OperationResult CreateCustomer(Customer customer)
    {
        try
        {
            databaseContext.Customers.Add(customer);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }
}