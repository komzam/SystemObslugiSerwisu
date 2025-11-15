using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Presentation.Shared;
using system_obslugi_serwisu.Presentation.Customers.Dto;

namespace system_obslugi_serwisu.Presentation.Customers;

public static class CustomerMapper
{
    public static FullCustomerDto ToFullDto(Customer customer)
    {
        var customerDto = new FullCustomerDto
        {
            Id = customer.Id.Value,
            Email = customer.Email.Value,
            Name = customer.Name.DisplayName,
            Phone = customer.Phone?.Number,
            PhoneRegionCode = customer.Phone?.RegionCode,
            IsBusiness = customer.IsBusiness,
            PreferredContactMethod = customer.PreferredContactMethod,
            PreferredReturnMethod = customer.PreferredReturnMethod,
            Address = customer.Address==null ? null : SharedMapper.ToDto(customer.Address)
        };
        return customerDto;
    }
    
    public static CustomerDto ToDto(Customer customer)
    {
        var customerDto = new CustomerDto
        {
            Id = customer.Id.Value,
            Name = customer.Name.DisplayName,
            IsBusiness = customer.IsBusiness
        };
        return customerDto;
    }
}