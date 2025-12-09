using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Database.SetTenant;

public class SetTenantCommand : IRequest<OperationResult>
{
    public Guid WorkerId { get; set; }
}