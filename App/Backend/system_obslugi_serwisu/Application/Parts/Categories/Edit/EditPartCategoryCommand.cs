using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.Edit;

public class EditPartCategoryCommand : IRequest<OperationResult>
{
    public required Guid PartCategoryId { get; set; }
    public required string Name { get; set; }
}