using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.Edit;

public class EditPartCategoryHandler(IUnitOfWork unitOfWork) : IRequestHandler<EditPartCategoryCommand, OperationResult>
{
    public async Task<OperationResult> Handle(EditPartCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryResult = await unitOfWork.PartRepository.GetCategory(new PartCategoryId(request.PartCategoryId));
        if (categoryResult.IsFailure)
            return categoryResult.Error;

        var changeNameResult = categoryResult.Value.ChangeName(request.Name);
        if(changeNameResult.IsFailure)
            return changeNameResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}