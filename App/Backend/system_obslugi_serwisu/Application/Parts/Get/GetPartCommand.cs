using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Get;

public class GetPartCommand : IRequest<OperationResult<Part>>
{
    public required Guid PartId { get; set; }
}