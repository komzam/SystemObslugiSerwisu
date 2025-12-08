using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Events;

public class ReservationFulfilledEvent : IDomainEvent
{
    public required RepairId RepairId { get; init; }
    public required PartReservationId PartReservationId { get; init; }
}