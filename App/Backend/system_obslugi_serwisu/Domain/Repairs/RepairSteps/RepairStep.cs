using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.RepairSteps;

public abstract class RepairStep
{
    public const int DescriptionMaxLength = 200;
    
    public Guid Id { get; private set; }
    public RepairStatus Status { get; private set; }
    public Repair Repair { get; private set; }
    public string? Description { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    protected RepairStep() { }

    protected RepairStep(RepairStatus status, Repair repair, string? description)
    {
        Id = Guid.NewGuid();
        Status = status;
        Repair = repair;
        Description = description;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    protected static OperationResult ValidateDescription(string? description)
    {
        if (description != null && description.Length > DescriptionMaxLength)
            return RepairStepErrors.DescriptionTooLong();
        
        return OperationResult.Success();
    }
}