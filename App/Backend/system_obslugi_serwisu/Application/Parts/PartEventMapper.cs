using MediatR;
using system_obslugi_serwisu.Application.Parts.Notifications;
using system_obslugi_serwisu.Domain.Parts.Events;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts;

public static class PartEventMapper
{
    public static INotification ToNotification(IDomainEvent domainEvent)
    {
        return domainEvent switch
        {
            ReservationFulfilledEvent e => new ReservationFulfilledNotification{RepairId = e.RepairId, PartReservationId = e.PartReservationId},
            _ => throw new InvalidOperationException("Unknown domain event type")
        };
    }
}