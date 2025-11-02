using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.ResolveComplaint;

public class ResolveComplaintCommand: IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}