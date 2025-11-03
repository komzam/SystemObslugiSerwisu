using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.RepairSteps;

public class QuoteRepairStep : RepairStep
{
    public Money LaborCost { get; private set; }
    public Money PartsCost { get; private set; }
    public Money TotalCost => LaborCost + PartsCost;
    public bool? QuoteAccepted { get; set; }

    
    private QuoteRepairStep() { }
    private QuoteRepairStep(RepairStatus status, Repair repair, Money labor, Money parts, string? description) : base(status, repair, description)
    {
        LaborCost = labor;
        PartsCost = parts;
        QuoteAccepted = null;
    }

    private static OperationResult ValidateInput(Money labor, Money parts, string? description)
    {
        var descriptionValidationResult = ValidateDescription(description);
        if (descriptionValidationResult.IsFailure)
            return descriptionValidationResult.Error;
        
        if(!labor.Currency.Equals(parts.Currency))
            return RepairStepErrors.CurrencyMismatch();
        
        return OperationResult.Success();
    }

    public static OperationResult<QuoteRepairStep> Create(RepairStatus status, Repair repair, Money labor, Money parts, string? description)
    {
        var validationResult = ValidateInput(labor, parts, description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        return new QuoteRepairStep(status, repair, labor, parts, description);
    }

}