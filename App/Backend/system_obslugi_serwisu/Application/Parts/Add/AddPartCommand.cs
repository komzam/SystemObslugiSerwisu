using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Add;

public class AddPartCommand : IRequest<OperationResult>
{
    public required string Name { get; set; }
    public required Guid PartCategoryId { get; set; }
    public required int InitialStock { get; set; }
    public required int LowStockThreshold { get; set; }
}