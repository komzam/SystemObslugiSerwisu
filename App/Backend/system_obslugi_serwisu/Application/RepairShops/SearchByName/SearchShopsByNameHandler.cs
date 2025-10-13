using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.SearchByName;

public class SearchShopsByNameHandler : IRequestHandler<SearchShopsByNameCommand, OperationResult<PaginatedList<RepairShop>>>
{
    public Task<OperationResult<PaginatedList<RepairShop>>> Handle(SearchShopsByNameCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}