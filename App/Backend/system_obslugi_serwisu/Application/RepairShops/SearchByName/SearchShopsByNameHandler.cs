using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.SearchByName;

public class SearchShopsByNameHandler(IUnitOfWork unitOfWork) : IRequestHandler<SearchShopsByNameCommand, OperationResult<PaginatedList<RepairShop>>>
{
    public async Task<OperationResult<PaginatedList<RepairShop>>> Handle(SearchShopsByNameCommand request, CancellationToken cancellationToken)
    {
        var searchResult = await unitOfWork.RepairShopRepository.SearchByName(request.Name, request.PageNumber, request.PageSize);
        if (searchResult.IsFailure)
            return searchResult.Error;
        
        return searchResult.Value;
    }
}