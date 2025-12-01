using MediatR;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetRepairShops;

public class GetRepairShopsRepairsCommand : IRequest<OperationResult<PaginatedList<Repair>>>
{
    public required Guid RepairShopId { get; set; }
    public required Guid WorkerId { get; set; }
    public required int PageNumber { get; set; }
    public required int PageSize { get; set; }
}