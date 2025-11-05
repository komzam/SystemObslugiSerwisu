using MediatR;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.CompleteRepairSuccess;

public class CompleteRepairSuccessCommand: IRequest<OperationResult>
{
    public required Guid RepairId { get; init; }
    public CurrencyCode? FinalCostCurrency { get; init; }
    public decimal? FinalCost { get; init; }
    public string? Description { get; init; }
}