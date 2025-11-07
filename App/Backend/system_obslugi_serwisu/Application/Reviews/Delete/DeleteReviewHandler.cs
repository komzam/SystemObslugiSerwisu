using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.RepairShops;
using system_obslugi_serwisu.Domain.Customers;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Reviews;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Reviews.Delete;

public class DeleteReviewHandler(IUnitOfWork unitOfWork) : IRequestHandler<DeleteReviewCommand, OperationResult>
{
    public async Task<OperationResult> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
    {
        var repairShopResult = await unitOfWork.RepairShopRepository.Get(new RepairShopId(request.RepairShopId), new RepairShopInclude{Reviews=true});
        if (repairShopResult.IsFailure)
            return repairShopResult.Error;
        
        var customerResult = await unitOfWork.CustomerRepository.GetCustomer(new CustomerId(request.CustomerId));
        if (customerResult.IsFailure)
            return customerResult.Error;
        
        var deleteReviewResult = repairShopResult.Value.RemoveReview(new ReviewId(request.ReviewId), customerResult.Value);
        if(deleteReviewResult.IsFailure)
            return deleteReviewResult.Error;

        var saveChangesResult = await unitOfWork.SaveChanges();
        if (saveChangesResult.IsFailure)
            return saveChangesResult.Error;
        
        return OperationResult.Success();
    }
}