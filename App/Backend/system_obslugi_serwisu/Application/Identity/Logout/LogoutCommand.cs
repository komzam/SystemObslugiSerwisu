using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Identity.Logout;

public class LogoutCommand : IRequest<OperationResult>
{
}