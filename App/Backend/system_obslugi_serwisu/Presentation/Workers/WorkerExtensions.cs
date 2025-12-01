using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Repairs.Get;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.Workers.Dto;

namespace system_obslugi_serwisu.Presentation.Workers;

[ExtendObjectType(typeof(FullWorkerDto))]
public class WorkerExtensions
{
    [Authorize]
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
    
    [Authorize]
    public async Task<RepairDto?> GetActiveRepair([Service] IMediator mediatr, [Parent] FullWorkerDto workerDto)
    {
        if(workerDto.AssignedRepairId == null) return null;
        
        var repairResult = await mediatr.Send(new GetRepairCommand
        {
            RepairId = workerDto.AssignedRepairId.Value,
            RequesterId = workerDto.Id,
            ActingRole = ActingRole.Worker
        });
        if(repairResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairResult.Error.GetUserMessage())
                .SetCode(repairResult.Error.GetUserCode())
                .Build());
        
        return RepairMapper.ToDto(repairResult.Value);
    }
}