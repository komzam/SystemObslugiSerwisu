using MediatR;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.Get;

public class GetRepairCommand : IRequest<OperationResult<Repair>>
{
    public Guid RepairId { get; init; }
}