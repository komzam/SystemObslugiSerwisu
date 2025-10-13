using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.SearchByName;

public class SearchShopsByNameCommand : IRequest<OperationResult<PaginatedList<RepairShop>>>
{
    public required string Name { get; set; }
    public required int PageSize { get; set; }
    public required int PageNumber { get; set; }
}