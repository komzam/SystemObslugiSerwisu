using HotChocolate.Authorization;
using system_obslugi_serwisu.Presentation.Parts.Dto;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;

namespace system_obslugi_serwisu.Presentation.Parts;

[ExtendObjectType(typeof(PartNeededDto))]
public class PartNeededExtensions
{
    [Authorize]
    public Task<PartDto?> GetPart([Parent] PartNeededDto partNeeded, PartBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(partNeeded.PartId);
    }
    
    [Authorize]
    public Task<RepairDto?> GetRepair([Parent] PartNeededDto partNeeded, RepairBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(partNeeded.RepairId);
    }
}