using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Get;

public class GetPartHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetPartCommand, OperationResult<Part>>
{
    public async Task<OperationResult<Part>> Handle(GetPartCommand request, CancellationToken cancellationToken)
    {
        var partResult = await unitOfWork.PartRepository.GetPart(new PartId(request.PartId));
        if (partResult.IsFailure)
            return partResult.Error;
        return partResult.Value;
    }
}