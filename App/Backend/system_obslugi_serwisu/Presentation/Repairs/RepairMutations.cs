using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Repairs.AddImage;
using system_obslugi_serwisu.Application.Repairs.Book;
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
}