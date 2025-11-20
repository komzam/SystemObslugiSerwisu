using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.GetList;

public class GetRepairShopListCommand : IRequest<OperationResult<List<RepairShop>>>
{
    public required List<Guid> RepairShopIds { get;set; }
}