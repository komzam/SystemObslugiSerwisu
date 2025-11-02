using Stateless;

namespace system_obslugi_serwisu.Domain.Repairs.RepairStateMachine;

public static class RepairStateMachineFactory
{
    public static StateMachine<RepairStatus, RepairTrigger> Create(
        Func<RepairStatus> stateAccessor, 
        Action<RepairStatus> stateMutator, 
        Repair repairInstance
    )
    {
        var machine = new StateMachine<RepairStatus, RepairTrigger>(stateAccessor, stateMutator);

        machine.Configure(RepairStatus.AwaitingDelivery)
            .Permit(RepairTrigger.CheckIn, RepairStatus.Received);

        machine.Configure(RepairStatus.Received)
            .Permit(RepairTrigger.QueueForDiagnosis, RepairStatus.AwaitingDiagnosis);

        machine.Configure(RepairStatus.AwaitingDiagnosis)
            .Permit(RepairTrigger.StartDiagnosis, RepairStatus.Diagnosing);

        machine.Configure(RepairStatus.Diagnosing)
            .Permit(RepairTrigger.SubmitQuote, RepairStatus.AwaitingApproval)
            .Permit(RepairTrigger.DeclareUnfixable, RepairStatus.Unfixable);
        
        machine.Configure(RepairStatus.Unfixable)
            .Permit(RepairTrigger.FinalizeUnfixable, RepairStatus.DiagnosisFeeRequired);

        machine.Configure(RepairStatus.AwaitingApproval)
            .Permit(RepairTrigger.ApproveQuote, RepairStatus.AwaitingRepair)
            .Permit(RepairTrigger.RejectQuote, RepairStatus.DiagnosisFeeRequired);

        machine.Configure(RepairStatus.DiagnosisFeeRequired)
            .Permit(RepairTrigger.PaymentCompleted, RepairStatus.AwaitingShipping);
        
        machine.Configure(RepairStatus.FinalPaymentRequired)
            .Permit(RepairTrigger.PaymentCompleted, RepairStatus.AwaitingShipping);

        machine.Configure(RepairStatus.AwaitingRepair)
            .Permit(RepairTrigger.StartRepair, RepairStatus.InRepair);

        machine.Configure(RepairStatus.InRepair)
            .Permit(RepairTrigger.CompleteRepairSuccess, RepairStatus.FinalPaymentRequired)
            .Permit(RepairTrigger.CompleteRepairFailure, RepairStatus.RepairFailed)
            .Permit(RepairTrigger.PartsNeeded, RepairStatus.AwaitingParts);

        machine.Configure(RepairStatus.RepairFailed)
            .Permit(RepairTrigger.FinalizeFailedRepair, RepairStatus.DiagnosisFeeRequired);
        
        machine.Configure(RepairStatus.AwaitingParts)
            .Permit(RepairTrigger.PartsArrived, RepairStatus.InRepair);

        machine.Configure(RepairStatus.ReadyForPickup)
            .Permit(RepairTrigger.Pickup, RepairStatus.Completed);
        
        machine.Configure(RepairStatus.AwaitingShipping)
            .Permit(RepairTrigger.Ship, RepairStatus.Shipped);
        
        machine.Configure(RepairStatus.Shipped)
            .Permit(RepairTrigger.FinalizeDelivery, RepairStatus.Completed);
        
        machine.Configure(RepairStatus.Complaint)
            .Permit(RepairTrigger.ResolveComplaint, RepairStatus.Completed);
        
        return machine;
    }
}