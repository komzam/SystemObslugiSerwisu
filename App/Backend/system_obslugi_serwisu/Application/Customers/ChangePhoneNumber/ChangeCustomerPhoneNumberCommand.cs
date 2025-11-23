using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangePhoneNumber;

public class ChangeCustomerPhoneNumberCommand : IRequest<OperationResult>
{
    public required Guid CustomerId { get; set; }
    public required string NewPhoneNumber { get; set; }
    public required string RegionCode { get; set; }
}