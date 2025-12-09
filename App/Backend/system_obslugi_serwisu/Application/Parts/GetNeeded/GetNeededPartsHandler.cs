using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.GetNeeded;

public class GetNeededPartsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetNeededPartsCommand, OperationResult<PaginatedList<PartNeeded>>>
{
    public async Task<OperationResult<PaginatedList<PartNeeded>>> Handle(GetNeededPartsCommand request, CancellationToken cancellationToken)
    {
        var neededParts = await unitOfWork.PartRepository
            .GetNeededParts(new RepairId(request.RepairId), request.PageNumber, request.PageSize);
        if(neededParts.IsFailure)
            return neededParts.Error;
        
        return neededParts.Value;
    }
}