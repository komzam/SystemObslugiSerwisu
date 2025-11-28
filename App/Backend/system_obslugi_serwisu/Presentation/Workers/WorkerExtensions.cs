using MediatR;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.GetMessages;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.Workers.Dto;

namespace system_obslugi_serwisu.Presentation.Workers;

[ExtendObjectType(typeof(FullWorkerDto))]
public class WorkerExtensions
{
    public async Task<RepairShopDto?> GetRepairShop([Service] IMediator mediatr, [Parent] FullWorkerDto workerDto)
    {
        if(workerDto.RepairShopId == null) return null;
        
        var repairShopResult = await mediatr.Send(new GetRepairShopCommand
        {
            Id = workerDto.RepairShopId.Value
        });
        if(repairShopResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairShopResult.Error.GetUserMessage())
                .SetCode(repairShopResult.Error.GetUserCode())
                .Build());
        
        return RepairShopMapper.ToDto(repairShopResult.Value);
    }
}