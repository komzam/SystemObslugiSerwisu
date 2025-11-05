using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.RepairSteps;

public class NormalRepairStep : RepairStep
{
    private NormalRepairStep() { }
    private NormalRepairStep(int stepNumber, RepairStatus status, Repair repair, string? description) : base(stepNumber, status, repair, description) { }

    public static OperationResult<NormalRepairStep> Create(int stepNumber, RepairStatus status, Repair repair, string? description=null)
    {
        var validateResult = ValidateDescription(description);
        if (validateResult.IsFailure)
            return validateResult.Error;
        
        return new NormalRepairStep(stepNumber, status, repair, description);
    }
}