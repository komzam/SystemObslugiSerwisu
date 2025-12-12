using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Events;

public class OrderReceivedEvent : IDomainEvent
{
    public required PartOrderId PartOrderId { get; init; }
}