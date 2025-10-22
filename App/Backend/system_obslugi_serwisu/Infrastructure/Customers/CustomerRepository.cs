using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Customers.Errors;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Customers;

public class CustomerRepository(DatabaseContext databaseContext) : ICustomerRepository
{
    public async Task<OperationResult<Customer>> GetCustomer(Guid id)
    {
        Customer? customer;
        
        try
        {
             customer = await databaseContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }

        if (customer == null)
            return CustomerErrors.CustomerNotFound();
        
        return customer;
    }

    public async Task<OperationResult> CreateCustomer(Customer customer)
    {
        try
        {
            await databaseContext.Customers.AddAsync(customer);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }
}