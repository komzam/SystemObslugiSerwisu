using MediatR;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.GetList;

public class GetCustomerListCommand : IRequest<OperationResult<List<Customer>>>
{
    public required List<Guid> CustomerIds { get; init; }
}