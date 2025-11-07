using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ReportComplaint;

public class ReportComplaintCommand: IRequest<OperationResult>
{
    public required Guid RepairId { get; init; }
    public required Guid CustomerId { get; init; }
}