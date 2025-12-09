using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairNotes.GetList;

public class GetRepairNotesHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetRepairNotesCommand, OperationResult<List<RepairNote>>>
{
    public async Task<OperationResult<List<RepairNote>>> Handle(GetRepairNotesCommand request, CancellationToken cancellationToken)
    {
        var notesResult = await unitOfWork.NoteRepository.GetRepairNotes(new RepairId(request.RepairId));
        if (notesResult.IsFailure)
            return notesResult.Error;
        return notesResult.Value;
    }
}