using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.Get;

public class GetRepairShopCommand : IRequest<OperationResult<RepairShop>>
{
    public required Guid Id { get;set; }
}