using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts.Events;

public class OrderOrderedEvent: IDomainEvent
{
    public required PartOrderId PartOrderId { get; init; }
}