using MediatR;
using system_obslugi_serwisu.Application.Parts.Notifications.OrderOrdered;
using system_obslugi_serwisu.Application.Parts.Notifications.OrderReceived;
using system_obslugi_serwisu.Application.Parts.Notifications.ReservationFulfilled;
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
            OrderOrderedEvent e => new OrderOrderedNotification{PartOrderId = e.PartOrderId},
            OrderReceivedEvent e => new OrderReceivedNotification{PartOrderId = e.PartOrderId},
            _ => throw new InvalidOperationException("Unknown domain event type")
        };
    }
}