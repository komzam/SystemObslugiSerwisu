using MediatR;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Application.Repairs.RepairState.StartDiagnosis;

public class StartDiagnosisCommand : IRequest<OperationResult>
{
    public Guid RepairId { get; init; }
}