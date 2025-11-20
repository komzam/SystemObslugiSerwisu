using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.GetList;

public class GetRepairShopListHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairShopListCommand, OperationResult<List<RepairShop>>>
{
    public async Task<OperationResult<List<RepairShop>>> Handle(GetRepairShopListCommand request, CancellationToken cancellationToken)
    {
        var listOfIds = request.RepairShopIds.Select(id => new RepairShopId(id)).ToList();
        
        return await unitOfWork.RepairShopRepository.GetRepairShops(listOfIds);
    }
}