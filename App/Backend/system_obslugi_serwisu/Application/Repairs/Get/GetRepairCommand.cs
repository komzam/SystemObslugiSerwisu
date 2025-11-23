using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.Get;

public class GetRepairCommand : IRequest<OperationResult<Repair>>
{
    public required Guid RepairId { get; init; }
    public required Guid RequesterId { get; init; }
    public required ActingRole ActingRole { get; init; }
}