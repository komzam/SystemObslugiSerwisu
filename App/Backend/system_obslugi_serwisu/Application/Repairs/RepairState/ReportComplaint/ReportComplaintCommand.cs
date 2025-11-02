using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ReportComplaint;

public class ReportComplaintCommand: IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}