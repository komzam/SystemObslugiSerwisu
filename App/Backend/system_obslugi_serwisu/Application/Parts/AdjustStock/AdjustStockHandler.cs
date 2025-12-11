using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.AdjustStock;

public class AdjustStockHandler(IUnitOfWork unitOfWork) : IRequestHandler<AdjustStockCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AdjustStockCommand request, CancellationToken cancellationToken)
    {
        var partResult = await unitOfWork.PartRepository.GetPart(new PartId(request.PartId));
        if (partResult.IsFailure)
            return partResult.Error;

        partResult.Value.AdjustStock(request.NewStock);

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}