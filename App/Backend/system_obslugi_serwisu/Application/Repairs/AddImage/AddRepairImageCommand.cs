using MediatR;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.AddImage;

public class AddRepairImageCommand : IRequest<OperationResult<string>>
{
    public required Guid RepairId { get; set; }
    public required Guid WorkerId { get; set; }
    public required string ContentType { get; set; }
}