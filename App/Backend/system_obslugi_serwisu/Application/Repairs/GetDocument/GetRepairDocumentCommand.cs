using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetDocument;

public class GetRepairDocumentCommand : IRequest<OperationResult<string>>
{
    public required Guid RepairId { get; set; }
}