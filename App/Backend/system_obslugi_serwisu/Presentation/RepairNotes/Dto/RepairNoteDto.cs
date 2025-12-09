namespace system_obslugi_serwisu.Presentation.RepairNotes.Dto;

public class RepairNoteDto
{
    public required Guid Id { get; set; }
    [GraphQLIgnore]
    public required Guid WorkerId { get; set; }
    public required Guid RepairId { get; set; }
    public required string Content { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
}