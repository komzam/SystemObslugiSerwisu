using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Presentation.RepairNotes.Dto;

namespace system_obslugi_serwisu.Presentation.RepairNotes;

public static class RepairNoteMapper
{
    public static RepairNoteDto ToDto(RepairNote repairNote)
    {
        return new RepairNoteDto
        {
            Id = repairNote.Id.Value,
            RepairId = repairNote.RepairId.Value,
            WorkerId = repairNote.WorkerId.Value,
            Content = repairNote.Content,
            CreatedAt = repairNote.CreatedAt
        };
    }
}