using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.Delete;

public class DeletePartCategoryHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeletePartCategoryCommand, OperationResult>
{
    public async Task<OperationResult> Handle(DeletePartCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryResult = await unitOfWork.PartRepository.GetCategory(new PartCategoryId(request.PartCategoryId));
        if(categoryResult.IsFailure)
            return categoryResult.Error;

        var partsInCategoryResult = await unitOfWork.PartRepository.CountParts(new PartFilter
        {
            Categories = [request.PartCategoryId]
        });
        if(partsInCategoryResult.IsFailure)
            return partsInCategoryResult.Error;

        if (partsInCategoryResult.Value != 0)
            return PartCategoryErrors.HasAssignedParts();

        var deleteResult = await unitOfWork.PartRepository.RemovePartCategory(categoryResult.Value.Id);
        if(deleteResult.IsFailure)
            return deleteResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}