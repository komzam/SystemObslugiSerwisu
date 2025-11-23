using system_obslugi_serwisu.Domain.Workers;
using system_obslugi_serwisu.Presentation.Workers.Dto;

namespace system_obslugi_serwisu.Presentation.Workers;

public static class WorkerMapper
{
    public static FullWorkerDto ToFullDto(Worker worker)
    {
        return new FullWorkerDto{
            Id = worker.Id.Value,
            FirstName = worker.FirstName,
            LastName = worker.LastName
        };
    }
}