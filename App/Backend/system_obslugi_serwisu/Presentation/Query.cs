using system_obslugi_serwisu.Presentation.Customer;

namespace system_obslugi_serwisu.Presentation;

public class Query
{
    public CustomerDto? Me()
    {
        CustomerDto customer = new CustomerDto();
        customer.Email = "AA";
        return customer;
    }

    public CustomerDto? GetUser()
    {
        CustomerDto customer = new CustomerDto();
        customer.Email = "AA";
        return customer;
    }
}