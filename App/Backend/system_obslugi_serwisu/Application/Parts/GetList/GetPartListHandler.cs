using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.GetList;

public class GetPartListHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetPartListCommand, OperationResult<PaginatedList<Part>>>
{
    public async Task<OperationResult<PaginatedList<Part>>> Handle(GetPartListCommand request, CancellationToken cancellationToken)
    {
        var partsResult = await unitOfWork.PartRepository.GetParts(request.PageNumber, request.PageSize, request.PartFilter);
        if (partsResult.IsFailure)
            return partsResult.Error;
        return partsResult.Value;
    }
}