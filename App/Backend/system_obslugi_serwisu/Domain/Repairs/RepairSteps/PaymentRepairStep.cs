using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.RepairSteps;

public class PaymentRepairStep : RepairStep
{
    public Money Amount { get; private set; }
    public bool Paid { get; set; }

    private PaymentRepairStep() { }
    private PaymentRepairStep(RepairStatus status, Repair repair, Money amount, string? description) : base(status, repair, description)
    {
        Amount = amount;
        Paid = false;
    }

    public static OperationResult<PaymentRepairStep> Create( RepairStatus status, Repair repair, Money amount ,string? description)
    {
        var validationResult = ValidateDescription(description);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new PaymentRepairStep(status, repair, amount, description);
    }
}