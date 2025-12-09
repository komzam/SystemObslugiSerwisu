using MediatR;
using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairNotes.GetList;

public class GetRepairNotesCommand : IRequest<OperationResult<List<RepairNote>>>
{
    public required Guid RepairId { get; set; }
}