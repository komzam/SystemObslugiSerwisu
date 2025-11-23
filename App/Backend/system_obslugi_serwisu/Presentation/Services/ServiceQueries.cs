using MediatR;
using system_obslugi_serwisu.Application.Services.Get;
using system_obslugi_serwisu.Presentation.Services.Dto;
using system_obslugi_serwisu.Presentation.Services.Get;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Presentation.Services;


[ExtendObjectType(typeof(Query))]
public class ServiceQueries
{
    public async Task<PaginatedList<ServiceDto>> Services([Service] IMediator mediatr, GetServicesRequest request)
    {
        var serviceListResult = await mediatr.Send(new GetServicesCommand() {
            RepairShopId = request.RepairShopId,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize 
        });
        
        if(serviceListResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(serviceListResult.Error.GetUserMessage())
                .SetCode(serviceListResult.Error.GetUserCode())
                .Build());
        
        return serviceListResult.Value.Map<ServiceDto>(service => ServiceMapper.ToDto(service));
    }
}