using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.RepairNotes.GetList;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.RepairNotes.Dto;

namespace system_obslugi_serwisu.Presentation.RepairNotes;

[ExtendObjectType(typeof(Query))]
public class RepairNoteQueries
{
    [Authorize]
    [SetTenantMiddleware]
    public async Task<List<RepairNoteDto>> RepairNotes([Service] IMediator mediatr, Guid repairId)
    {
        var notesResult = await mediatr.Send(new GetRepairNotesCommand
        {
            RepairId = repairId
        });

        if(notesResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(notesResult.Error.GetUserMessage())
                .SetCode(notesResult.Error.GetUserCode())
                .Build());

        return notesResult.Value.Select(RepairNoteMapper.ToDto).ToList();
    }
}