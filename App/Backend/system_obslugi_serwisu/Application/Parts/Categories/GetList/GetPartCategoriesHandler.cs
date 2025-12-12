using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Categories.GetList;

public class GetPartCategoriesHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetPartCategoriesCommand, OperationResult<List<PartCategory>>>
{
    public async Task<OperationResult<List<PartCategory>>> Handle(GetPartCategoriesCommand request, CancellationToken cancellationToken)
    {
        var categoriesResult = await unitOfWork.PartRepository.GetCategories();
        if (categoriesResult.IsFailure)
            return categoriesResult.Error;
        return categoriesResult.Value;
    }
}