namespace system_obslugi_serwisu.Presentation.RepairNotes.Add;

public class AddRepairNoteRequest
{
    public required Guid RepairId { get; set; }
    public required string Content { get; set; }
}