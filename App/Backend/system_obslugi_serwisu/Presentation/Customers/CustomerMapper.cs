using system_obslugi_serwisu.Domain.Customers;

namespace system_obslugi_serwisu.Presentation.Customers;

public class CustomerMapper
{
    public static CustomerDto ToDto(Customer customer)
    {
        var customerDto = new CustomerDto
        {
            Email = customer.Email,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
        };

        return customerDto;
    }

    public static Customer FromDto(CustomerDto customerDto)
    {
        var customer = new Customer
        {
            Email = customerDto.Email,
            FirstName = customerDto.FirstName,
            LastName = customerDto.LastName,
        };
        return customer;
    }
}