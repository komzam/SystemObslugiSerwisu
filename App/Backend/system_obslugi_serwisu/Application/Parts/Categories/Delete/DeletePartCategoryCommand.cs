using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.Delete;

public class DeletePartCategoryCommand: IRequest<OperationResult>
{
    public required Guid PartCategoryId { get; set; }
}