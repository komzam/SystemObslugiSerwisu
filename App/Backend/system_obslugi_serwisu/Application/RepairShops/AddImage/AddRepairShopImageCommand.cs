using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.AddImage;

public class AddRepairShopImageCommand : IRequest<OperationResult<string>>
{
    public required Guid RepairShopId { get; set; }
    public required Guid WorkerId { get; set; }
    public required RepairShopImageType ImageType { get; set; }
    public required string ContentType { get; set; }
}