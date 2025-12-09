using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairNotes;

public interface INoteRepository
{
    public Task<OperationResult<List<RepairNote>>> GetRepairNotes(RepairId repairId);
    public Task<OperationResult> AddRepairNote(RepairNote note);
    public Task<OperationResult> RemoveRepairNote(RepairNoteId noteId);
}