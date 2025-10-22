using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs;

public interface IRepairRepository
{
    public Task<OperationResult<Repair>> GetRepair(Guid id);
    public Task<OperationResult> CreateRepair(Repair repair);
}