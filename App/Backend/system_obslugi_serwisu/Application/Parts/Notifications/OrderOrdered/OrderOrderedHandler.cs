using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Application.Parts.Notifications.OrderOrdered;

public class OrderOrderedHandler(IUnitOfWork unitOfWork) : INotificationHandler<OrderOrderedNotification>
{
    public async Task Handle(OrderOrderedNotification notification, CancellationToken cancellationToken)
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

        foreach (var part in partsResult.Value)
        {
            part.UnflagForReorder();
        }

        await unitOfWork.SaveChanges();
    }
}