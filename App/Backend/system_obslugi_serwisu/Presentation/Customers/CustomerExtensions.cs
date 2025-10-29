using MediatR;
using system_obslugi_serwisu.Application.Repairs.GetCustomers;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.GetList;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Customers;

[ExtendObjectType(typeof(CustomerDto))]
public class CustomerExtensions
{
    public async Task<PaginatedList<RepairDto>> GetRepairs([Service] IMediator mediatr, [Parent] CustomerDto customer, GetRepairListRequest request)
    {
        var repairListResult = await mediatr.Send(new GetCustomersRepairsCommand{CustomerId = customer.Id, PageNumber = request.PageNumber, PageSize = request.PageSize});
        if(repairListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairListResult.Error.GetUserMessage())
                .SetCode(repairListResult.Error.GetUserCode())
                .Build());

        return repairListResult.Value.Map<RepairDto>(r => RepairMapper.ToDto(r));
    }
}