using MediatR;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetRepairShopsCount;

public class GetRepairShopsRepairCountCommand: IRequest<OperationResult<int>>
{
    public required Guid RepairShopId { get; set; }
    public required Guid WorkerId { get; set; }
    public required RepairStatus? Status { get; set; }
}