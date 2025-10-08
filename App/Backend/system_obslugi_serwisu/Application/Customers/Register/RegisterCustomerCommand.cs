using MediatR;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Customers.Register;

public class RegisterCustomerCommand : IRequest<OperationResult<Customer>>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required bool IsBusiness { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? CompanyName { get; init; }
    public string? TaxIdNumber { get; init; }
}