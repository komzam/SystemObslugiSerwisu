using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.Add;

public class AddPartCategoryHandler(IUnitOfWork unitOfWork) : IRequestHandler<AddPartCategoryCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AddPartCategoryCommand request, CancellationToken cancellationToken)
    {
        var partCategoryResult = PartCategory.Create(request.Name);
        if (partCategoryResult.IsFailure)
            return partCategoryResult.Error;

        var addResult = await unitOfWork.PartRepository.AddPartCategory(partCategoryResult.Value);
        if (addResult.IsFailure)
            return addResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}