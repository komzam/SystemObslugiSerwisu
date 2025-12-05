using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Repairs.AddImage;
using system_obslugi_serwisu.Application.Repairs.AssignWorker;
using system_obslugi_serwisu.Application.Repairs.Book;
using system_obslugi_serwisu.Application.Repairs.DeleteImage;
using system_obslugi_serwisu.Application.Repairs.UnassignWorker;
using system_obslugi_serwisu.Presentation.Repairs.Book;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.RepairState;

namespace system_obslugi_serwisu.Presentation.Repairs;


[ExtendObjectType(typeof(Mutation))]
public class RepairMutations
{
    public RepairActions RepairActions([Service] IMediator mediatr) => new RepairActions(mediatr);
    
    public async Task<RepairDto> BookRepair([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, BookRepairRequest request)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        
        Guid? customerId = null;
        if (!string.IsNullOrWhiteSpace(customerIdString))
        {
            if (!Guid.TryParse(customerIdString, out var parsedGuid))
            {
                throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage("Invalid customer id")
                    .SetCode("BadGuid")
                    .Build());
            }
            customerId = parsedGuid;
        }
        
        if (!Guid.TryParse(request.RepairShopId, out var repairShopId))
        {
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair shop id")
                .SetCode("BadGuid")
                .Build());
        }
        
        var repairResult = await mediatr.Send(new BookRepairCommand
        {
            CustomerId = customerId,
            RepairShopId = repairShopId,
            ContactInfo = request.ContactInfo,
            DeviceInfo = request.DeviceInfo,
            FaultInfo = request.FaultInfo,
            ReturnInfo = request.ReturnInfo,
            AdditionalComment = request.AdditionalComment
        });
        if (repairResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairResult.Error.GetUserMessage())
                .SetCode(repairResult.Error.GetUserCode())
                .Build());

        return RepairMapper.ToDto(repairResult.Value);
    }
    
    [Authorize]
    public async Task<string> AddRepairImage([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, Guid repairId, string contentType)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var addImageUrlResult = await mediatr.Send(new AddRepairImageCommand{
            RepairId = repairId,
            WorkerId= workerId,
            ContentType = contentType
        });

        if(addImageUrlResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(addImageUrlResult.Error.GetUserMessage())
                .SetCode(addImageUrlResult.Error.GetUserCode())
                .Build());

        return addImageUrlResult.Value;
    }
    
    [Authorize]
    public async Task<bool> DeleteRepairImage([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, Guid imageId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var deleteImageResult = await mediatr.Send(new DeleteRepairImageCommand{
            WorkerId= workerId,
            ImageId= imageId
        });

        if(deleteImageResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(deleteImageResult.Error.GetUserMessage())
                .SetCode(deleteImageResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> AssignWorker([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var assignWorkerResult = await mediatr.Send(new AssignRepairWorkerCommand{
            RepairId = repairId,
            WorkerId= workerId
        });

        if(assignWorkerResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(assignWorkerResult.Error.GetUserMessage())
                .SetCode(assignWorkerResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    public async Task<bool> UnassignWorker([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal, Guid repairId)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var unassignWorkerResult = await mediatr.Send(new UnassignRepairWorkerCommand{
            RepairId = repairId,
            RequesterId = workerId
        });

        if(unassignWorkerResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(unassignWorkerResult.Error.GetUserMessage())
                .SetCode(unassignWorkerResult.Error.GetUserCode())
                .Build());

        return true;
    }
}