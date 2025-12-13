using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Order;

public class OrderPartOrderCommand : IRequest<OperationResult>
{
    public required Guid PartOrderId { get; set; }
    public required string SupplierOrderNumber { get; set; }
}