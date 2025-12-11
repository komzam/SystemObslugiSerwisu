using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.FlagForReorder;

public class ChangeReorderFlagHandler(IUnitOfWork unitOfWork) : IRequestHandler<ChangeReorderFlagCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ChangeReorderFlagCommand request, CancellationToken cancellationToken)
    {
        var partResult = await unitOfWork.PartRepository.GetPart(new PartId(request.PartId));
        if (partResult.IsFailure)
            return partResult.Error;
        
        if(partResult.Value.NeedsReorder)
            partResult.Value.UnflagForReorder();
        else
            partResult.Value.FlagForReorder();

        var saveResult = await unitOfWork.SaveChanges();
        if(saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}