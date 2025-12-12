using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Reservations.Get;

public class GetPartReservationsCommand : IRequest<OperationResult<PaginatedList<PartReservation>>>
{
    public required Guid PartId { get; init; }
    public required int PageNumber { get; init; }
    public required int PageSize { get; init; }
}