using MediatR;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangePreferredContact;

public class ChangeCustomerPreferredContactCommand : IRequest<OperationResult>
{
    public required Guid CustomerId { get; set; }
    public required ContactMethod? ContactMethod { get; set; }
}