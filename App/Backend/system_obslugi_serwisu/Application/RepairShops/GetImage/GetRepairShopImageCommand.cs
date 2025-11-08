using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.GetImage;

public class GetRepairShopImageCommand : IRequest<OperationResult<string>>
{
    public Guid RepairShopId { get; set; }
}