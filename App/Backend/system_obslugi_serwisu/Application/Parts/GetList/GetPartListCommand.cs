using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.GetList;

public class GetPartListCommand : IRequest<OperationResult<PaginatedList<Part>>>
{
    public required int PageNumber { get; set; }
    public required int PageSize { get; set; }
}