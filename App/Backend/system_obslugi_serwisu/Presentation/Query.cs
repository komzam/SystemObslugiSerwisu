using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.Customers.Get;
using system_obslugi_serwisu.Application.RepairShops.Get;
using system_obslugi_serwisu.Application.RepairShops.SearchByName;
using system_obslugi_serwisu.Application.Reviews.Get;
using system_obslugi_serwisu.Presentation.Customers;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.RepairShops.Get;
using system_obslugi_serwisu.Presentation.RepairShops.SearchByName;
using system_obslugi_serwisu.Presentation.RepairShops.Dto;
using system_obslugi_serwisu.Presentation.Reviews;
using system_obslugi_serwisu.Presentation.Reviews.Dto;
using system_obslugi_serwisu.Presentation.Reviews.Get;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation;

public class Query
{
    [Authorize]
    public async Task<CustomerDto> Me([Service] IMediator mediatr, ClaimsPrincipal claimsPrincipal)
    {
        var customerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(customerIdString, out var customerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid customer id")
                .SetCode("BadGuid")
                .Build());
        
        var customerResult = await mediatr.Send(new GetCustomerCommand{ Id = customerId });
        if(customerResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(customerResult.Error.GetUserMessage())
                .SetCode(customerResult.Error.GetUserCode())
                .Build());
        
        return CustomerMapper.ToDto(customerResult.Value);
    }

    public async Task<RepairShopDto> RepairShop([Service] IMediator mediatr,
        GetRepairShopRequest request)
    {
        if (!Guid.TryParse(request.Id, out var repairShopId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair shop id")
                .SetCode("BadGuid")
                .Build());
        
        var repairShopResult = await mediatr.Send(new GetRepairShopCommand{
            Id=repairShopId
        });

        if(repairShopResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairShopResult.Error.GetUserMessage())
                .SetCode(repairShopResult.Error.GetUserCode())
                .Build());

        return RepairShopMapper.ToDto(repairShopResult.Value);
    }

    public async Task<PaginatedList<RepairShopDto>> SearchShopsByName([Service] IMediator mediatr, SearchByNameRequest request)
    {
        var shopsListResult = await mediatr.Send(new SearchShopsByNameCommand { Name = request.Name ,
                                                                                PageNumber = request.PageNumber,
                                                                                PageSize = request.PageSize});
        
        if(shopsListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(shopsListResult.Error.GetUserMessage())
                .SetCode(shopsListResult.Error.GetUserCode())
                .Build());

        return shopsListResult.Value.Map<RepairShopDto>(repairShop => RepairShopMapper.ToDto(repairShop));
    }

    public async Task<PaginatedList<ReviewDto>> Reviews([Service] IMediator mediatr, GetReviewsRequest request)
    {
        if (!Guid.TryParse(request.RepairShopId, out var repairShopId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair shop id")
                .SetCode("BadGuid")
                .Build());
        
        var reviewListResult = await mediatr.Send(new GetReviewsCommand { RepairShopId = repairShopId,
                                                                          PageNumber = request.PageNumber,
                                                                          PageSize = request.PageSize });
        
        if(reviewListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(reviewListResult.Error.GetUserMessage())
                .SetCode(reviewListResult.Error.GetUserCode())
                .Build());
        
        return reviewListResult.Value.Map<ReviewDto>(review => ReviewMapper.ToDto(review));
    }
}