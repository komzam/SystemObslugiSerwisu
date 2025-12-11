using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.GetById;

public class GetPartsByIdCommand : IRequest<OperationResult<List<Part>>>
{
    public required List<Guid> PartIds { get; set; }
}