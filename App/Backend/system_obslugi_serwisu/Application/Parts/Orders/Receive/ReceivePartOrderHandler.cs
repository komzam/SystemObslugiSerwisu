using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Receive;

public class ReceivePartOrderHandler(IUnitOfWork unitOfWork, IMediator mediatr) : IRequestHandler<ReceivePartOrderCommand, OperationResult>
{
    public async Task<OperationResult> Handle(ReceivePartOrderCommand request, CancellationToken cancellationToken)
    {
        var orderResult = await unitOfWork.PartRepository.GetPartOrder(new PartOrderId(request.PartOrderId));
        if (orderResult.IsFailure)
            return orderResult.Error;
        
        var receiveOrderResult = orderResult.Value.Receive();
        if (receiveOrderResult.IsFailure)
            return receiveOrderResult.Error;

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