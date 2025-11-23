using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity.ChangeEmail;

public class ChangeEmailCommand : IRequest<OperationResult>
{
    public required Guid UserId { get; set; }
    public required string Password { get; set; }
    public required string NewEmail { get; set; }
}