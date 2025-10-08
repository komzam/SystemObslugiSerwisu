using MediatR;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.Get;

public class GetCustomerCommand : IRequest<OperationResult<Customer>>
{
    public required Guid Id { get; init; }
}