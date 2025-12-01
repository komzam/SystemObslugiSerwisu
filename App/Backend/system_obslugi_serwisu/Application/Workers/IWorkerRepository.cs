using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Workers;

public interface IWorkerRepository
{
    public Task<OperationResult<Worker>> GetWorker(WorkerId id);
    public Task<OperationResult<List<Worker>>> GetWorkers(List<WorkerId> workerIds);
    public Task<OperationResult> CreateWorker(Worker worker);
}