using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.AddImage;

public class AddRepairShopImageCommand : IRequest<OperationResult<string>>
{
    public required Guid RepairShopId { get; set; }
    public required Guid WorkerId { get; set; }
}