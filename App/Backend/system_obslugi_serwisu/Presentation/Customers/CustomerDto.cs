using HotChocolate.Authorization;

namespace system_obslugi_serwisu.Presentation.Customers;

[Authorize]
public class CustomerDto
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}