using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.Add;

public class AddPartCategoryCommand : IRequest<OperationResult>
{
    public required string Name { get; set; }
}