using MediatR;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.ChangeAddress;

public class ChangeCustomerAddressCommand : IRequest<OperationResult>
{
    public required Guid CustomerId { get; init; }
    public required string RecipientName { get; init; }
    public required string Street { get; init; }
    public required string BuildingNumber { get; init; }
    public string? ApartmentNumber { get; init; }
    public required string PostalCode { get; init; }
    public required string City { get; init; }
    public required Country Country { get; init; }
}