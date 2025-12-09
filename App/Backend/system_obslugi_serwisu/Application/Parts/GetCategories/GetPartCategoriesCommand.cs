using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.GetCategories;

public class GetPartCategoriesCommand : IRequest<OperationResult<List<PartCategory>>>
{
}