using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Parts.Orders.Add;

public class AddPartOrderCommand : IRequest<OperationResult>
{
    public required string SupplierName { get; set; }
    public List<Guid>? PartIds { get; set; }
}