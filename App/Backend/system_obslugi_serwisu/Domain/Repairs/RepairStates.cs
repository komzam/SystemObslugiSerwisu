using Stateless;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Repairs.RepairStateMachine;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public partial class Repair
{
    private StateMachine<RepairStatus, RepairTrigger> StateMachine {
        get
        {
            if (_fsm == null)
                _fsm = RepairStateMachineFactory.Create(
                    () => Status,
                    s => Status = s,
                    AddRepairStep,
                    this);
            return _fsm;
        }
    }

    private StateMachine<RepairStatus, RepairTrigger>? _fsm;
    
    private async Task<OperationResult> FireTriggerAsync(RepairTrigger trigger, string? description = null)
    {
        if (!StateMachine.CanFire(trigger))
            return RepairErrors.InvalidTrigger();
        
        await StateMachine.FireAsync(trigger, description);
        
        return OperationResult.Success();
    }
    
    public async Task<OperationResult> FinalizeBooking()
    {
        return await FireTriggerAsync(RepairTrigger.FinalizeBooking);
    }
    
    public async Task<OperationResult> CheckIn(string? description = null)
    {
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        return await FireTriggerAsync(RepairTrigger.CheckIn, description);
    }
    
    public async Task<OperationResult> QueueForDiagnosis()
    {
        return await FireTriggerAsync(RepairTrigger.QueueForDiagnosis);
    }
    
    public async Task<OperationResult> StartDiagnosis()
    {
        return await FireTriggerAsync(RepairTrigger.StartDiagnosis);
    }
    
    public async Task<OperationResult> SubmitQuote(Quote quote, string? description = null)
    {
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        Quote = quote;
        return await FireTriggerAsync(RepairTrigger.SubmitQuote, description);
    }

    public async Task<OperationResult> DeclareUnfixable(string? description = null)
    {
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
     
        return await FireTriggerAsync(RepairTrigger.DeclareUnfixable, description);
    }
    
    public async Task<OperationResult> FinalizeUnfixable(Money diagnosisFee)
    {
        DiagnosisFee = diagnosisFee;
        
        return await FireTriggerAsync(RepairTrigger.FinalizeUnfixable);
    }
    
    public async Task<OperationResult> ApproveQuote()
    {
        return await FireTriggerAsync(RepairTrigger.ApproveQuote);
    }
    
    public async Task<OperationResult> RejectQuote(Money diagnosisFee)
    {
        DiagnosisFee = diagnosisFee;
        
        return await FireTriggerAsync(RepairTrigger.RejectQuote);
    }
    
    public async Task<OperationResult> StartRepair()
    {
        return await FireTriggerAsync(RepairTrigger.StartRepair);
    }

    public async Task<OperationResult> PartsNeeded()
    {
        return await FireTriggerAsync(RepairTrigger.PartsNeeded);
    }
    
    public async Task<OperationResult> PartsArrived()
    {
        return await FireTriggerAsync(RepairTrigger.PartsArrived);
    }

    public async Task<OperationResult> CompleteRepairSuccess(Money finalCost, string? description = null)
    {
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        FinalCost = finalCost;
        return await FireTriggerAsync(RepairTrigger.CompleteRepairSuccess, description);
    }

    public async Task<OperationResult> CompleteRepairFailure(string? description = null)
    {
        var validationResult = RepairStep.ValidateDescription(description);
        if(validationResult.IsFailure)
            return validationResult.Error;
        
        return await FireTriggerAsync(RepairTrigger.CompleteRepairFailure, description);
    }

    public async Task<OperationResult> FinalizeFailedRepair()
    {
        return await FireTriggerAsync(RepairTrigger.FinalizeFailedRepair);
    }
    
    public async Task<OperationResult> PaymentCompleted()
    {
        return await FireTriggerAsync(RepairTrigger.PaymentCompleted);
    }
    
    public async Task<OperationResult> Pickup()
    {
        return await FireTriggerAsync(RepairTrigger.Pickup);
    }
    
    public async Task<OperationResult> Ship()
    {
        return await FireTriggerAsync(RepairTrigger.Ship);
    }
    
    public async Task<OperationResult> FinalizeDelivery()
    {
        return await FireTriggerAsync(RepairTrigger.FinalizeDelivery);
    }
    
    public async Task<OperationResult> Cancel()
    {
        return await FireTriggerAsync(RepairTrigger.Cancel);
    }

    public async Task<OperationResult> ReportComplaint()
    {
        return await FireTriggerAsync(RepairTrigger.ReportComplaint);
    }
    
    public async Task<OperationResult> ResolveComplaint()
    {
        return await FireTriggerAsync(RepairTrigger.ResolveComplaint);
    }
}