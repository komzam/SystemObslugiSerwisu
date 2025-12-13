using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Order;

public class OrderPartOrderHandler(IUnitOfWork unitOfWork, IMediator mediatr) : IRequestHandler<OrderPartOrderCommand, OperationResult>
{
    public async Task<OperationResult> Handle(OrderPartOrderCommand request, CancellationToken cancellationToken)
    {
        var orderResult = await unitOfWork.PartRepository.GetPartOrder(new PartOrderId(request.PartOrderId));
        if (orderResult.IsFailure)
            return orderResult.Error;

        var orderOrderResult = orderResult.Value.Order(request.SupplierOrderNumber);
        if (orderOrderResult.IsFailure)
            return orderOrderResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;

        foreach (var domainEvent in orderResult.Value.DomainEvents)
        {
            await mediatr.Publish(PartEventMapper.ToNotification(domainEvent), cancellationToken);
        }

        return OperationResult.Success();
    }
}