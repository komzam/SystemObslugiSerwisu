using MediatR;
using system_obslugi_serwisu.Domain.RepairShops.Errors;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Database.SetTenant;

public class SetTenantHandler(IUnitOfWork unitOfWork) : IRequestHandler<SetTenantCommand, OperationResult>
{
    public async Task<OperationResult> Handle(SetTenantCommand request, CancellationToken cancellationToken)
    {
        var workerResult = await unitOfWork.WorkerRepository.GetWorker(new WorkerId(request.WorkerId));
        if (workerResult.IsFailure)
            return workerResult.Error;

        if (workerResult.Value.RepairShopId == null)
            return RepairShopErrors.AccessDenied();

        unitOfWork.SetTenant(workerResult.Value.RepairShopId);
        return OperationResult.Success();
    }
}