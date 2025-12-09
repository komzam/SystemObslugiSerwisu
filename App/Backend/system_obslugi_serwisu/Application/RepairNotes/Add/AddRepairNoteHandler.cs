using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairNotes.Add;

public class AddRepairNoteHandler(IUnitOfWork unitOfWork) : IRequestHandler<AddRepairNoteCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AddRepairNoteCommand request, CancellationToken cancellationToken)
    {
        var noteResult = RepairNote.Create(new RepairId(request.RepairId), new WorkerId(request.WorkerId), request.Content);
        if (noteResult.IsFailure)
            return noteResult.Error;

        var addResult = await unitOfWork.NoteRepository.AddRepairNote(noteResult.Value);
        if(addResult.IsFailure)
            return addResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}