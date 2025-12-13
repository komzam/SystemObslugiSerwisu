using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Edit;

public class EditPartOrderCommand : IRequest<OperationResult>
{
    public required Guid PartOrderId { get; set; }
    public string? SupplierName { get; set; }
    public string? SupplierOrderNumber { get; set; } 
}