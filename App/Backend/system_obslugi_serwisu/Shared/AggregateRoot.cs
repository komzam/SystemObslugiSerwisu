namespace system_obslugi_serwisu.Shared;

public class AggregateRoot
{
    private readonly List<IDomainEvent> _domainEvents = new();
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();
    
    protected void RaiseEvent(IDomainEvent @event) => _domainEvents.Add(@event);
}