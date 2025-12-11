using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Add;

public class AddPartHandler(IUnitOfWork unitOfWork) : IRequestHandler<AddPartCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AddPartCommand request, CancellationToken cancellationToken)
    {
        var categoryResult = await unitOfWork.PartRepository.GetCategory(new PartCategoryId(request.PartCategoryId));
        if (categoryResult.IsFailure)
            return categoryResult.Error;
        
        var partResult = Part.Create(request.Name, request.ManufacturerCode, categoryResult.Value.Id, request.InitialStock, request.LowStockThreshold);
        if (partResult.IsFailure)
            return partResult.Error;
        
        var addResult = await unitOfWork.PartRepository.AddPart(partResult.Value);
        if (addResult.IsFailure)
            return addResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}