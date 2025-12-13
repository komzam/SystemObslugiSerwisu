using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Delete;

public class DeletePartOrderCommand : IRequest<OperationResult>
{
    public required Guid PartOrderId { get; set; }
}