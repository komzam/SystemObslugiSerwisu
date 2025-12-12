using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.GetListById;

public class GetPartCategoriesByIdCommand : IRequest<OperationResult<List<PartCategory>>>
{
    public required List<Guid> CategoryIds { get; set; }
}