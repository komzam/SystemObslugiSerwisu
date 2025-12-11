using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.GetCategoriesById;

public class GetPartCategoriesByIdHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetPartCategoriesByIdCommand, OperationResult<List<PartCategory>>>
{
    public async Task<OperationResult<List<PartCategory>>> Handle(GetPartCategoriesByIdCommand request, CancellationToken cancellationToken)
    {
        var categoryIds = request.CategoryIds.Select( id => new PartCategoryId(id)).ToList();

        var categoriesResult = await unitOfWork.PartRepository.GetCategories(categoryIds);
        if (categoriesResult.IsFailure)
            return categoriesResult.Error;
        
        return categoriesResult.Value;
    }
}