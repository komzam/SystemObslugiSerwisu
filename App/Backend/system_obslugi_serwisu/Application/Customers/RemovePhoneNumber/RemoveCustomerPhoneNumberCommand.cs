using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.RemovePhoneNumber;

public class RemoveCustomerPhoneNumberCommand : IRequest<OperationResult>
{
    public required Guid CustomerId { get; set; }
}