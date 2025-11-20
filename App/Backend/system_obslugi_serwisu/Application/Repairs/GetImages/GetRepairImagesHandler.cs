using MediatR;
using system_obslugi_serwisu.Application.Database;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.GetImages;

public class GetRepairImagesHandler(IUnitOfWork unitOfWork, IRepairStorageService repairStorageService) : IRequestHandler<GetRepairImagesCommand, OperationResult<List<ImageDto>>>
{
    public async Task<OperationResult<List<ImageDto>>> Handle(GetRepairImagesCommand request, CancellationToken cancellationToken)
    {
        var imagesResult = await unitOfWork.ImageRepository.GetRepairImages(new RepairId(request.RepairId));
        if (imagesResult.IsFailure)
            return imagesResult.Error;
        
        return await repairStorageService.GetRepairImages(imagesResult.Value);
    }
}