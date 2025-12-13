using MediatR;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Repairs;

namespace system_obslugi_serwisu.Application.Parts.Notifications.ReservationFulfilled;

public class ReservationFulfilledNotification : INotification
{
    public required RepairId RepairId { get; init; }
    public required PartReservationId PartReservationId { get; init; }
}