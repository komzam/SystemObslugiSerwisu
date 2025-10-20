using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Services.Get;

public class GetServicesHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetServicesCommand, OperationResult<PaginatedList<Service>>>
{
    public async Task<OperationResult<PaginatedList<Service>>> Handle(GetServicesCommand request, CancellationToken cancellationToken)
    {
        var servicesListResult = await unitOfWork.ServiceRepository.Get(
            request.RepairShopId,
            request.PageNumber,
            request.PageSize
        );
        if (servicesListResult.IsFailure)
            return servicesListResult.Error;
        
        return servicesListResult.Value;
    }
}