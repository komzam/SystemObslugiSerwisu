using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Reviews.Add;

public class AddReviewHandler(IUnitOfWork unitOfWork) : IRequestHandler<AddReviewCommand, OperationResult>
{
    public async Task<OperationResult> Handle(AddReviewCommand request, CancellationToken cancellationToken)
    {
        var repairShopResult = await unitOfWork.RepairShopRepository.Get(request.RepairShopId, new RepairShopInclude{Reviews=true});
        if (repairShopResult.IsFailure)
            return repairShopResult.Error;
        
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(request.CustomerId);
        if (customerResult.IsFailure)
            return customerResult.Error;
        
        var addReviewResult = repairShopResult.Value.AddReview(customerResult.Value, request.Rating, request.Comment);
        if(addReviewResult.IsFailure)
            return addReviewResult.Error;

        var saveChangesResult = await unitOfWork.SaveChanges();
        if (saveChangesResult.IsFailure)
            return saveChangesResult.Error;
        
        return OperationResult.Success();
    }
}