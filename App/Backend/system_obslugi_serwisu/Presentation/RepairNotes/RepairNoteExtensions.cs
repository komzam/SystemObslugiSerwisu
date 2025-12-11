using HotChocolate.Authorization;
using system_obslugi_serwisu.Presentation.RepairNotes.Dto;
using system_obslugi_serwisu.Presentation.Workers;
using system_obslugi_serwisu.Presentation.Workers.Dto;

namespace system_obslugi_serwisu.Presentation.RepairNotes;

[ExtendObjectType(typeof(RepairNoteDto))]
public class RepairNoteExtensions
{
    [Authorize]
    public Task<WorkerDto?> GetWorker([Parent] RepairNoteDto repairNote, WorkerBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(repairNote.WorkerId);
    }
}