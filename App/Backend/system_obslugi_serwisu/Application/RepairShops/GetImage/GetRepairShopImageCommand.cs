using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairShops.GetImage;

public class GetRepairShopImageCommand : IRequest<OperationResult<ImageDto>>
{
    public required Guid RepairShopId { get; set; }
    public required RepairShopImageType ImageType { get; set; }
}