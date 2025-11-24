using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.RemoveAddress;

public class RemoveCustomerAddressCommand : IRequest<OperationResult>
{
    public required Guid CustomerId { get; set; }
}