using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairNotes.Add;

public class AddRepairNoteCommand : IRequest<OperationResult>
{
    public required Guid RepairId { get; set; }
    public required Guid WorkerId { get; set; }
    public required string Content { get; set; }
}