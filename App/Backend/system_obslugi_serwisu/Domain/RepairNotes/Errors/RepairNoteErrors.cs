using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairNotes.Errors;

public static class RepairNoteErrors
{
    private static readonly string Prefix = "RepairNotes";

    public static OperationError RepairNoteNotFound(string message = "Repair note not found") =>
        new ($"{Prefix}.RepairNoteNotFound", message);
    
    public static OperationError InvalidContent(string message = "Invalid repair note content") =>
        new ($"{Prefix}.InvalidContent", message);
    
    public static OperationError ContentTooLong(string message = "Repair note content is too long") =>
        new ($"{Prefix}.ContentTooLong", message);
}