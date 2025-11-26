using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs;

public interface IRepairStorageService
{
    public Task<OperationResult<List<ImageDto>>> GetRepairImages(List<RepairImage> repairImages);
    public Task<OperationResult<string>> AddRepairImage(RepairImage image, string contentType);
    public Task<OperationResult> CreateRepairDocument(RepairId repairId, TicketNumber ticketNumber);
    public Task<OperationResult<string>> GetRepairDocument(RepairId repairId);
}