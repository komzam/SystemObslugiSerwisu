using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.RepairNotes;
using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Domain.RepairNotes.Errors;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.RepairNotes;

public class NoteRepository(RepairShopContext repairShopContext) : INoteRepository
{
    public async Task<OperationResult<List<RepairNote>>> GetRepairNotes(RepairId repairId)
    {
        try
        {
            return await repairShopContext.RepairNotes
                .Where(rn => rn.RepairId == repairId).ToListAsync();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult> AddRepairNote(RepairNote note)
    {
        try
        {
            await repairShopContext.RepairNotes.AddAsync(note);
            return OperationResult.Success();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }

    public async Task<OperationResult> RemoveRepairNote(RepairNoteId noteId)
    {
        try
        {
            var note = await repairShopContext.RepairNotes.Where(rn => rn.Id == noteId).FirstOrDefaultAsync();
            if (note == null)
                return RepairNoteErrors.RepairNoteNotFound();    
            
            repairShopContext.RepairNotes.Remove(note);
            return OperationResult.Success();
        }
        catch
        {
            return DatabaseErrors.UnknownError();
        }
    }
}