using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.DeleteImage;

public class DeleteRepairImageCommand : IRequest<OperationResult>
{
    public required Guid WorkerId { get; set; }
    public required Guid ImageId { get; set; }
}