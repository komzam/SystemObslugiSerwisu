using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.GetList;

public class GetPartCategoriesCommand : IRequest<OperationResult<List<PartCategory>>>
{
}