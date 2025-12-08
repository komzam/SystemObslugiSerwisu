using system_obslugi_serwisu.Domain.RepairNotes.Errors;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.RepairNotes;

public record RepairNoteId(Guid Value);

public class RepairNote
{
    public const int NoteContentMaxLength = 1000;
    
    public RepairNoteId Id { get; private set; }
    public RepairId RepairId { get; private set; }
    public WorkerId WorkerId { get; private set; }
    public string Content { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    private RepairNote() { }

    private RepairNote(RepairId repairId, WorkerId workerId, string content)
    {
        Id = new RepairNoteId(Guid.NewGuid());
        RepairId = repairId;
        WorkerId = workerId;
        Content = content;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public static OperationResult ValidateInput(string content)
    {
        if (String.IsNullOrWhiteSpace(content))
            return RepairNoteErrors.InvalidContent();
        
        if (content.Length > NoteContentMaxLength)
            return RepairNoteErrors.ContentTooLong();

        return OperationResult.Success();
    }

    public static OperationResult<RepairNote> Create(RepairId repairId, WorkerId workerId, string content)
    {
        content = content.Trim();
        var validationResult = ValidateInput(content);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new RepairNote(repairId, workerId, content);
    }
}