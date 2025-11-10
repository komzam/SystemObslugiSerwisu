using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.AddImage;

public class AddRepairShopImageCommand : IRequest<OperationResult>
{
    public required Guid RepairShopId { get; set; }
}