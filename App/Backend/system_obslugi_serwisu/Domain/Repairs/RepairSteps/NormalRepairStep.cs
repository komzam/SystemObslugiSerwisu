using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.RepairSteps;

public class NormalRepairStep : RepairStep
{
    private NormalRepairStep() { }
    private NormalRepairStep(RepairStatus status, Repair repair, string? description) : base(status, repair, description) { }

    public static OperationResult<NormalRepairStep> Create(RepairStatus status, Repair repair, string? description)
    {
        var validateResult = ValidateDescription(description);
        if (validateResult.IsFailure)
            return validateResult.Error;
        
        return new NormalRepairStep(status, repair, description);
    }
}