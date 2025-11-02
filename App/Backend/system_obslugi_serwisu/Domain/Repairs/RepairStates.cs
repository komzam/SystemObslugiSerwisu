using Stateless;
using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Domain.Repairs.RepairStateMachine;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public partial class Repair
{
    private StateMachine<RepairStatus, RepairTrigger> StateMachine {
        get
        {
            if (_fsm == null)
                _fsm = RepairStateMachineFactory.Create(() => Status, s => Status = s, this);
            return _fsm;
        }
    }

    private StateMachine<RepairStatus, RepairTrigger>? _fsm;
    
    private async Task<OperationResult> FireTriggerAsync(RepairTrigger trigger)
    {
        if (!StateMachine.CanFire(trigger))
            return RepairErrors.InvalidTrigger();

        await StateMachine.FireAsync(trigger);
        
        return OperationResult.Success();
    }

    public async Task<OperationResult> CheckIn()
    {
        return await FireTriggerAsync(RepairTrigger.CheckIn);
    }
    
    public async Task<OperationResult> QueueForDiagnosis()
    {
        return await FireTriggerAsync(RepairTrigger.QueueForDiagnosis);
    }
    
    public async Task<OperationResult> StartDiagnosis()
    {
        return await FireTriggerAsync(RepairTrigger.StartDiagnosis);
    }
    
    public async Task<OperationResult> SubmitQuote()
    {
        return await FireTriggerAsync(RepairTrigger.SubmitQuote);
    }

    public async Task<OperationResult> DeclareUnfixable()
    {
        return await FireTriggerAsync(RepairTrigger.DeclareUnfixable);
    }
    
    public async Task<OperationResult> FinalizeUnfixable()
    {
        return await FireTriggerAsync(RepairTrigger.FinalizeUnfixable);
    }
    
    public async Task<OperationResult> ApproveQuote()
    {
        return await FireTriggerAsync(RepairTrigger.ApproveQuote);
    }
    
    public async Task<OperationResult> RejectQuote()
    {
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

    public async Task<OperationResult> CompleteRepairSuccess()
    {
        return await FireTriggerAsync(RepairTrigger.CompleteRepairSuccess);
    }

    public async Task<OperationResult> CompleteRepairFailure()
    {
        return await FireTriggerAsync(RepairTrigger.CompleteRepairFailure);
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