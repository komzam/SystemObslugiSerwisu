using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.AdjustStock;

public class AdjustStockCommand : IRequest<OperationResult>
{
    public required Guid PartId { get; set; }
    public required int NewStock { get; set; }
}