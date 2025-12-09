using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts;

public interface IPartRepository
{
    public Task<OperationResult<List<PartCategory>>> GetCategories();
    public Task<OperationResult<PartCategory>> GetCategory(PartCategoryId categoryId);
    public Task<OperationResult> AddPartCategory(PartCategory category);
    public Task<OperationResult<PaginatedList<Part>>> GetParts(int pageNumber, int pageSize);
    public Task<OperationResult<Part>> GetPart(PartId partId);
    public Task<OperationResult> AddPart(Part part);
    public Task<OperationResult<PaginatedList<PartNeeded>>> GetNeededParts(RepairId repairId, int pageNumber, int pageSize);
}