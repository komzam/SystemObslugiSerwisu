using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Edit;

public class EditPartOrderHandler(IUnitOfWork unitOfWork) : IRequestHandler<EditPartOrderCommand, OperationResult>
{
    public async Task<OperationResult> Handle(EditPartOrderCommand request, CancellationToken cancellationToken)
    {
        var orderResult = await unitOfWork.PartRepository.GetPartOrder(new PartOrderId(request.PartOrderId));
        if (orderResult.IsFailure)
            return orderResult.Error;

        if (request.SupplierName != null)
        {
            var changeResult = orderResult.Value.ChangeSupplierName(request.SupplierName);
            if (changeResult.IsFailure)
                return changeResult.Error;
        }

        if (request.SupplierOrderNumber != null)
        {
            var changeResult = orderResult.Value.ChangeSupplierOrderNumber(request.SupplierOrderNumber);
            if (changeResult.IsFailure)
                return changeResult.Error;       
        }

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}