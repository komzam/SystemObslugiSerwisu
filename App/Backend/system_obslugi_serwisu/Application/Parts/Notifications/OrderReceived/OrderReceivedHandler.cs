using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Application.Parts.Notifications.OrderReceived;

public class OrderReceivedHandler(IUnitOfWork unitOfWork, IMediator mediatr) : INotificationHandler<OrderReceivedNotification>
{
    public async Task Handle(OrderReceivedNotification notification, CancellationToken cancellationToken)
    {
        var orderResult = await unitOfWork.PartRepository.GetPartOrder(notification.PartOrderId);
        if (orderResult.IsFailure)
            return;

        List<PartId> partIds = new();
        foreach (var item in orderResult.Value.Items)
        {
            partIds.Add(item.PartId);
        }
        
        var partsResult = await unitOfWork.PartRepository.GetParts(partIds);
        if (partsResult.IsFailure)
            return;

        foreach (var item in orderResult.Value.Items)
        {
            var part = partsResult.Value.FirstOrDefault(p => p.Id == item.PartId);

            if (part == null)
                continue;
            
            part.AddStock(item.Quantity, item.Price);
        }

        await unitOfWork.SaveChanges();

        foreach (var part in partsResult.Value)
        {
            foreach (var domainEvent in part.DomainEvents)
            {
                await mediatr.Publish(PartEventMapper.ToNotification(domainEvent), cancellationToken);
            }
        }
    }
}