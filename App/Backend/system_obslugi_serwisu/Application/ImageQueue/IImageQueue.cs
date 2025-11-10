using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.ImageQueue;

public interface IImageQueue
{
    public Task<OperationResult> AddImageToProcessingQueue(string imagePath);
}