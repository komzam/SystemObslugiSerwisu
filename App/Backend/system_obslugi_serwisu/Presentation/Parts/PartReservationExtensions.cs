using HotChocolate.Authorization;
using system_obslugi_serwisu.Presentation.Parts.Dto;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;

namespace system_obslugi_serwisu.Presentation.Parts;

[ExtendObjectType(typeof(PartReservationDto))]
public class PartReservationExtensions
{
    [Authorize]
    public Task<RepairDto?> GetRepair([Parent] PartReservationDto partReservation, RepairBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(partReservation.RepairId);
    }
}