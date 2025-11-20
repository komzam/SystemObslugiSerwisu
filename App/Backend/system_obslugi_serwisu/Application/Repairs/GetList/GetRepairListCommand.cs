using MediatR;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetList;

public class GetRepairListCommand : IRequest<OperationResult<List<Repair>>>
{
    public required List<Guid> RepairIds { get; set; }
}