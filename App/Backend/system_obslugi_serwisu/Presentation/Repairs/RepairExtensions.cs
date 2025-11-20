using MediatR;
using system_obslugi_serwisu.Application.Repairs.GetCustomers;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.GetList;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs;

[ExtendObjectType(typeof(RepairDto))]
public class RepairExtensions
{
    public Task<RepairShopDto?> GetRepairShop([Service] IMediator mediatr, [Parent] RepairDto repair, RepairShopBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(repair.RepairShopId);
    }
}