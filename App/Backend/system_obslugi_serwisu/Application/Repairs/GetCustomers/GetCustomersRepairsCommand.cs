using MediatR;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetCustomers;

public class GetCustomersRepairsCommand : IRequest<OperationResult<PaginatedList<Repair>>>
{
    public required Guid CustomerId { get; init; }
    public required int PageNumber { get; init; }
    public required int PageSize { get; init; }
}