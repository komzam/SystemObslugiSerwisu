using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Receive;

public class ReceivePartOrderCommand : IRequest<OperationResult>
{
    public required Guid PartOrderId { get; set; }
}