using HotChocolate.Authorization;

namespace system_obslugi_serwisu.Presentation.Customer;

[Authorize]
public class CustomerDto
{
    public string Email { get; set; }
}