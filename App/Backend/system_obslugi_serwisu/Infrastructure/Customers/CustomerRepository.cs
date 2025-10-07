using system_obslugi_serwisu.Application.Customers;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Customers;

public class CustomerRepository(DatabaseContext databaseContext) : ICustomerRepository
{
    private readonly DatabaseContext _databaseContext = databaseContext;

    public OperationResult<Customer> GetCustomer(Guid id)
    {
        Console.WriteLine("Get CUSTOMER");
        var customer = new Customer();
        customer.Email = "AABBCC";
        customer.FirstName = "John";
        customer.LastName = "Doe";
        return customer;
    }
}