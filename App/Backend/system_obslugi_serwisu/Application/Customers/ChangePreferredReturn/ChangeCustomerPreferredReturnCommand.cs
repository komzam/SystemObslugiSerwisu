using MediatR;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangePreferredReturn;

public class ChangeCustomerPreferredReturnCommand : IRequest<OperationResult>
{
    public required Guid CustomerId { get; set; }
    public required ReturnMethod? ReturnMethod { get; set; }
}