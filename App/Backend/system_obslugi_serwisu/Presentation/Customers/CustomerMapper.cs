using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Presentation.Shared;
using system_obslugi_serwisu.Presentation.Customers.Dto;

namespace system_obslugi_serwisu.Presentation.Customers;

public static class CustomerMapper
{
    public static CustomerDto ToDto(Customer customer)
    {
        var customerDto = new CustomerDto
        {
            Email = customer.Email.Value,
            Name = customer.Name.DisplayName,
            IsBusiness = customer.IsBusiness,
            PreferredContactMethod = customer.PreferredContactMethod?.ToString(),
            PreferredReturnMethod = customer.PreferredReturnMethod?.ToString(),
            Address = customer.Address==null ? null : SharedMapper.ToDto(customer.Address)
        };
        return customerDto;
    }
}