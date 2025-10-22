using MediatR;
using system_obslugi_serwisu.Application.Repairs.Get;
using system_obslugi_serwisu.Presentation.Repairs.Dto;
using system_obslugi_serwisu.Presentation.Repairs.Get;

namespace system_obslugi_serwisu.Presentation.Repairs;

[ExtendObjectType(typeof(Query))]
public class RepairQueries
{
    public async Task<RepairDto> Repair([Service] IMediator mediatr,
        GetRepairRequest request)
    {
        if (!Guid.TryParse(request.RepairId, out var repairId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid repair id")
                .SetCode("BadGuid")
                .Build());
        
        var repairResult = await mediatr.Send(new GetRepairCommand{
            RepairId= repairId
        });

        if(repairResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(repairResult.Error.GetUserMessage())
                .SetCode(repairResult.Error.GetUserCode())
                .Build());

        return RepairMapper.ToDto(repairResult.Value);
    }
}