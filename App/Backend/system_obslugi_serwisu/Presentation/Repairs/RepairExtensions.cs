using MediatR;
using system_obslugi_serwisu.Application.Repairs.GetCustomers;
using system_obslugi_serwisu.Application.Repairs.GetDocument;
using system_obslugi_serwisu.Application.Repairs.GetImages;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Application.RepairShops.GetImage;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.GetList;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs;

[ExtendObjectType(typeof(RepairDto))]
public class RepairExtensions
{
    public Task<RepairShopDto?> GetRepairShop([Service] IMediator mediatr, [Parent] RepairDto repair, RepairShopBatchDataLoader dataLoader)
    {
        return dataLoader.LoadAsync(repair.RepairShopId);
    }
    
    public async Task<List<Shared.ImageDto>> GetImages([Service] IMediator mediatr, [Parent] RepairDto repair)
    {
        var imagesResult = await mediatr.Send(new GetRepairImagesCommand()
        {
            RepairId = repair.Id
        });
        if(imagesResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(imagesResult.Error.GetUserMessage())
                .SetCode(imagesResult.Error.GetUserCode())
                .Build());

        return imagesResult.Value.Select(SharedMapper.ToDto).ToList();
    }
    
    public async Task<string> GetRepairDocument([Service] IMediator mediatr, [Parent] RepairDto repair)
    {
        var documentResult = await mediatr.Send(new GetRepairDocumentCommand()
        {
            RepairId = repair.Id
        });
        if(documentResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(documentResult.Error.GetUserMessage())
                .SetCode(documentResult.Error.GetUserCode())
                .Build());

        return documentResult.Value;
    }
}