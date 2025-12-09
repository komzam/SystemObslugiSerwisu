using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.RepairNotes;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.RepairNotes.Delete;

public class DeleteRepairNoteHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteRepairNoteCommand, OperationResult>
{
    public async Task<OperationResult> Handle(DeleteRepairNoteCommand request, CancellationToken cancellationToken)
    {
        var deleteResult = await unitOfWork.NoteRepository.RemoveRepairNote(new RepairNoteId(request.NoteId));
        if (deleteResult.IsFailure)
            return deleteResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;
        
        return OperationResult.Success();
    }
}