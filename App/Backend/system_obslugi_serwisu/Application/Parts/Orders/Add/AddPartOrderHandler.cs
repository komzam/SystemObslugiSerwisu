using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Parts;
using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Add;

public class AddPartOrderHandler(IUnitOfWork unitOfWork) : IRequestHandler<AddPartOrderCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AddPartOrderCommand request, CancellationToken cancellationToken)
    {
        var orderResult = PartOrder.Create(request.SupplierName);
        if (orderResult.IsFailure)
            return orderResult.Error;

        if (request.PartIds != null)
        {
            var partIds = request.PartIds.Select(id => new PartId(id)).ToList();
            var partsResult = await unitOfWork.PartRepository.GetParts(partIds);
            if(partsResult.IsFailure)
                return partsResult.Error;
            
            foreach (var partId in partIds)
            {
                var part = partsResult.Value.SingleOrDefault(p => p.Id == partId);
                if (part == null)
                    return PartErrors.PartNotFound();
                
                orderResult.Value.AddItem(part);
            }
        }
        
        var addResult = await unitOfWork.PartRepository.AddPartOrder(orderResult.Value);
        if (addResult.IsFailure)
            return addResult.Error;

        var saveResult = await unitOfWork.SaveChanges();
        if (saveResult.IsFailure)
            return saveResult.Error;

        return OperationResult.Success();
    }
}