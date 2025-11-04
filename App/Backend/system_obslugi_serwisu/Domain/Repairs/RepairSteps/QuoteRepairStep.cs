using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.RepairSteps;

public class QuoteRepairStep : RepairStep
{
    public Quote Quote { get; private set;} 
    
    private QuoteRepairStep() { }
    private QuoteRepairStep(RepairStatus status, Repair repair, Quote quote, string? description) : base(status, repair, description)
    {
        Quote = quote;
    }
    
    public static OperationResult<QuoteRepairStep> Create(RepairStatus status, Repair repair, Quote quote, string? description=null)
    {
        var descriptionValidationResult = ValidateDescription(description);
        if (descriptionValidationResult.IsFailure)
            return descriptionValidationResult.Error;
        
        return new QuoteRepairStep(status, repair, quote, description);
    }

}