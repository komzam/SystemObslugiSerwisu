using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Delete;

public class DeletePartOrderHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeletePartOrderCommand, OperationResult>
{
    public async Task<OperationResult> Handle(DeletePartOrderCommand request, CancellationToken cancellationToken)
    {
        var orderResult = await unitOfWork.PartRepository.GetPartOrder(new PartOrderId(request.PartOrderId));
        if (orderResult.IsFailure)
            return orderResult.Error;

        var canBeDeleted = orderResult.Value.CanBeDeleted();
        if(canBeDeleted.IsFailure)
            return canBeDeleted.Error;

        var deleteResult = await unitOfWork.PartRepository.DeletePartOrder(orderResult.Value.Id);
        if (deleteResult.IsFailure)
            return deleteResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}