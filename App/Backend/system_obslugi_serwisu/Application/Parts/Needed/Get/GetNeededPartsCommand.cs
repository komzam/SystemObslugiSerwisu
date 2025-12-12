using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Needed.Get;

public class GetNeededPartsCommand : IRequest<OperationResult<PaginatedList<PartNeeded>>>
{
    public required Guid RepairId { get; init; }
    public required int PageNumber { get; init; }
    public required int PageSize { get; init; }
}