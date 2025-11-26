using MediatR;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetDocument;

public class GetRepairDocumentHandler(IRepairStorageService repairStorageService) : IRequestHandler<GetRepairDocumentCommand, OperationResult<string>>
{
    public async Task<OperationResult<string>> Handle(GetRepairDocumentCommand request, CancellationToken cancellationToken)
    {
        var documentUrlResult = await repairStorageService.GetRepairDocument(new RepairId(request.RepairId));
        if (documentUrlResult.IsFailure)
            return documentUrlResult.Error;
        
        return documentUrlResult.Value;
    }
}