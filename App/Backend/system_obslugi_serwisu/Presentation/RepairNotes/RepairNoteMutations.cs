using System.Security.Claims;
using HotChocolate.Authorization;
using MediatR;
using system_obslugi_serwisu.Application.RepairNotes.Add;
using system_obslugi_serwisu.Application.RepairNotes.Delete;
using system_obslugi_serwisu.Presentation.Middleware;
using system_obslugi_serwisu.Presentation.RepairNotes.Add;

namespace system_obslugi_serwisu.Presentation.RepairNotes;

[ExtendObjectType(typeof(Mutation))]
public class RepairNoteMutations
{
    [Authorize]
    [SetTenantMiddleware]
    public async Task<bool> AddRepairNote(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        AddRepairNoteRequest request)
    {
        var workerIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(workerIdString, out var workerId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid worker id")
                .SetCode("BadGuid")
                .Build());
        
        var noteResult = await mediatr.Send(new AddRepairNoteCommand
        {
            WorkerId = workerId,
            RepairId = request.RepairId,
            Content = request.Content
        });

        if(noteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(noteResult.Error.GetUserMessage())
                .SetCode(noteResult.Error.GetUserCode())
                .Build());

        return true;
    }
    
    [Authorize]
    [SetTenantMiddleware]
    public async Task<bool> DeleteRepairNote(
        [Service] IMediator mediatr,
        ClaimsPrincipal claimsPrincipal,
        Guid repairNoteId)
    {
        var noteResult = await mediatr.Send(new DeleteRepairNoteCommand
        {
            NoteId = repairNoteId
        });

        if(noteResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(noteResult.Error.GetUserMessage())
                .SetCode(noteResult.Error.GetUserCode())
                .Build());

        return true;
    }
}