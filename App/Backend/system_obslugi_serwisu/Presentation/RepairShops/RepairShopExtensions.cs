using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Conversations.GetCustomers;
using system_obslugi_serwisu.Application.Conversations.GetRepairShops;
using system_obslugi_serwisu.Application.Repairs.GetRepairShops;
using system_obslugi_serwisu.Application.RepairShops.GetImage;
using system_obslugi_serwisu.Domain.RepairShops;
using system_obslugi_serwisu.Presentation.Conversations;
using system_obslugi_serwisu.Presentation.Conversations.Dto;
using system_obslugi_serwisu.Presentation.Conversations.GetList;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.GetList;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops;

[ExtendObjectType(typeof(RepairShopDto))]
public class RepairShopExtensions
{
    public async Task<Shared.ImageDto?> GetMiniatureImage([Service] IMediator mediatr, [Parent] RepairShopDto repairShop)
    {
        var imageResult = await mediatr.Send(new GetRepairShopImageCommand
        {
            RepairShopId = repairShop.Id,
            ImageType = RepairShopImageType.Miniature
        });
        return imageResult.IsFailure ? null : SharedMapper.ToDto(imageResult.Value);
    }
    
    public async Task<Shared.ImageDto?> GetMainImage([Service] IMediator mediatr, [Parent] RepairShopDto repairShop)
    {
        var imageResult = await mediatr.Send(new GetRepairShopImageCommand
        {
            RepairShopId = repairShop.Id,
            ImageType = RepairShopImageType.Main
        });
        return imageResult.IsFailure ? null : SharedMapper.ToDto(imageResult.Value);
    }
    
    [Authorize]
    public async Task<CursorPaginatedList<ConversationDto, Guid?>> GetConversations(
        [Service] IMediator mediatr,
        [Parent] RepairShopDto repairShop,
        ClaimsPrincipal claimsPrincipal,
        GetConversationListRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var conversationsListResult = await mediatr.Send(new GetRepairShopsConversationsCommand
        {
            RepairShopId = repairShop.Id,
            WorkerId = workerId,
            LastConversationId = request.LastConversationId,
            NumberOfConversations = request.NumberOfConversations
        });
        if(conversationsListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(conversationsListResult.Error.GetUserMessage())
                .SetCode(conversationsListResult.Error.GetUserCode())
                .Build());

        return conversationsListResult.Value.Map(ConversationMapper.ToDto, id=>id?.Value);
    }
    
    [Authorize]
    public async Task<PaginatedList<RepairDto>> GetRepairs(
        [Service] IMediator mediatr,
        [Parent] RepairShopDto repairShop,
        ClaimsPrincipal claimsPrincipal,
        GetRepairListRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var repairListResult = await mediatr.Send(new GetRepairShopsRepairsCommand
        {
            RepairShopId = repairShop.Id,
            WorkerId = workerId,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize
        });
        if(repairListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairListResult.Error.GetUserMessage())
                .SetCode(repairListResult.Error.GetUserCode())
                .Build());

        return repairListResult.Value.Map(RepairMapper.ToDto);
    }
}