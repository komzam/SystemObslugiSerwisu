using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.GetById;

public class GetPartsByIdHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetPartsByIdCommand, OperationResult<List<Part>>>
{
    public async Task<OperationResult<List<Part>>> Handle(GetPartsByIdCommand request, CancellationToken cancellationToken)
    {
        var partIds = request.PartIds.Select( id => new PartId(id)).ToList();

        var partsResult = await unitOfWork.PartRepository.GetParts(partIds);
        if (partsResult.IsFailure)
            return partsResult.Error;
        
        return partsResult.Value;
    }
}