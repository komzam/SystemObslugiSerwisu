using HotChocolate.Authorization;
using system_obslugi_serwisu.Presentation.Parts.Dto;

namespace system_obslugi_serwisu.Presentation.Parts;

[ExtendObjectType(typeof(PartDto))]
public class PartExtensions
{
    [Authorize]
    public Task<PartCategoryDto?> GetCategory([Parent] PartDto part, PartCategoryBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(part.CategoryId);
    }
}