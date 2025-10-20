using MediatR;
using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Services.Get;

public class GetServicesCommand : IRequest<OperationResult<PaginatedList<Service>>>
{
    public required Guid RepairShopId { get; init; }
    public required int PageSize { get; init; }
    public required int PageNumber { get; init; }
}