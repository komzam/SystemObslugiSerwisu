using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Reservations.Get;

public class GetPartReservationsHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetPartReservationsCommand, OperationResult<PaginatedList<PartReservation>>>
{
    public async Task<OperationResult<PaginatedList<PartReservation>>> Handle(GetPartReservationsCommand request, CancellationToken cancellationToken)
    {
        List<ReservationStatus> statuses = new (){ReservationStatus.AwaitingStock, ReservationStatus.Reserved};
        
        var requiredForResult = await unitOfWork.PartRepository
            .GetPartReservations(
                new PartId(request.PartId),
                request.PageNumber,
                request.PageSize,
                statuses
            );
        if(requiredForResult.IsFailure)
            return requiredForResult.Error;
        
        return requiredForResult.Value;
    }
}