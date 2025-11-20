using MediatR;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetImages;

public class GetRepairImagesCommand : IRequest<OperationResult<List<ImageDto>>>
{
    public required Guid RepairId { get; set; }
}