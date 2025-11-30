using MediatR;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity.Login;

public class LoginCommand : IRequest<OperationResult>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required bool RememberMe { get; init; }
    public required ActingRole ActingRole { get; init; }
}