using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.AddCategory;

public class AddPartCategoryCommand : IRequest<OperationResult>
{
    public required string Name { get; set; }
}