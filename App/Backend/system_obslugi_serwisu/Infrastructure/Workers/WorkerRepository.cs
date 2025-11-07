using Microsoft.EntityFrameworkCore;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Application.Workers;
using system_obslugi_serwisu.Domain.Customers.Errors;
using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Domain.Workers.Errors;
using system_obslugi_serwisu.Infrastructure.Database;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Workers;

public class WorkerRepository(DatabaseContext databaseContext) : IWorkerRepository
{
    public async Task<OperationResult<Worker>> GetWorker(WorkerId id)
    {
        Worker? worker;
        
        try
        {
            worker = await databaseContext.Workers.FirstOrDefaultAsync(w => w.Id == id);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }

        if (worker == null)
            return WorkerErrors.WorkerNotFound();
        
        return worker;
    }

    public async Task<OperationResult> CreateWorker(Worker worker)
    {
        try
        {
            await databaseContext.Workers.AddAsync(worker);
        }
        catch (Exception e)
        {
            return DatabaseErrors.UnknownError();
        }
        
        return OperationResult.Success();
    }
}