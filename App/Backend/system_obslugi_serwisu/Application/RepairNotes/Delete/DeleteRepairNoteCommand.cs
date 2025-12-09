using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairNotes.Delete;

public class DeleteRepairNoteCommand : IRequest<OperationResult>
{
    public required Guid NoteId { get; set; }
}