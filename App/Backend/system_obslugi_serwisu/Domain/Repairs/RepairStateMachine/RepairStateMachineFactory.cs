using Stateless;
using system_obslugi_serwisu.Domain.Repairs.RepairSteps;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.RepairStateMachine;

public static class RepairStateMachineFactory
{
    public static StateMachine<RepairStatus, RepairTrigger> Create(
        Func<RepairStatus> stateAccessor, 
        Action<RepairStatus> stateMutator,
        Action<RepairStep> addRepairStep,
        Repair repairInstance
    )
    {
        var machine = new StateMachine<RepairStatus, RepairTrigger>(stateAccessor, stateMutator);
        void NormalStep(string? description)
        {
            var repairStep = NormalRepairStep.Create(repairInstance.RepairHistory.Count, machine.State, repairInstance, description);
            addRepairStep(repairStep.Value);
        }

        void DiagnosisFeeStep(string? description)
        {
            var repairStep =
                PaymentRepairStep.Create(repairInstance.RepairHistory.Count, machine.State, repairInstance, repairInstance.DiagnosisFee, description);
            addRepairStep(repairStep.Value);
        }

        void FinalPaymentStep(string? description)
        {
            var repairStep = PaymentRepairStep.Create(repairInstance.RepairHistory.Count, machine.State, repairInstance, repairInstance.FinalCost, description);
            addRepairStep(repairStep.Value);
        }

        void QuoteStep(string? description)
        {
            var repairStep = QuoteRepairStep.Create(repairInstance.RepairHistory.Count, machine.State, repairInstance, repairInstance.Quote, description);
            addRepairStep(repairStep.Value);
        }

        machine.Configure(RepairStatus.Created)
            .Permit(RepairTrigger.FinalizeBooking, RepairStatus.AwaitingDelivery)
            .OnExit(() => NormalStep(null));
        
        machine.Configure(RepairStatus.AwaitingDelivery)
            .Permit(RepairTrigger.CheckIn, RepairStatus.Received)
            .OnEntry(() => NormalStep(null));
        
        var checkInTrigger = machine.SetTriggerParameters<string?>(RepairTrigger.CheckIn);
        machine.Configure(RepairStatus.Received)
            .Permit(RepairTrigger.QueueForDiagnosis, RepairStatus.AwaitingDiagnosis)
            .OnEntryFrom(checkInTrigger, NormalStep);
        
        machine.Configure(RepairStatus.AwaitingDiagnosis)
            .Permit(RepairTrigger.StartDiagnosis, RepairStatus.Diagnosing)
            .OnEntry(() => NormalStep(null));
        
        machine.Configure(RepairStatus.Diagnosing)
            .PermitIf(RepairTrigger.SubmitQuote, RepairStatus.AwaitingApproval, () => repairInstance.Quote != null)
            .Permit(RepairTrigger.DeclareUnfixable, RepairStatus.Unfixable)
            .OnEntry(() => NormalStep(null));
        
        var declareUnfixableTrigger = machine.SetTriggerParameters<string?>(RepairTrigger.DeclareUnfixable);
        machine.Configure(RepairStatus.Unfixable)
            .PermitIf(RepairTrigger.FinalizeUnfixable, RepairStatus.DiagnosisFeeRequired, () => repairInstance.DiagnosisFee != null && repairInstance.DiagnosisFee.Value != 0)
            .PermitIf(RepairTrigger.FinalizeUnfixable, RepairStatus.AwaitingShipping, () => (repairInstance.DiagnosisFee == null || repairInstance.DiagnosisFee.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.CourierDelivery)
            .PermitIf(RepairTrigger.FinalizeUnfixable, RepairStatus.ReadyForPickup, () => (repairInstance.DiagnosisFee == null || repairInstance.DiagnosisFee.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.SelfPickup)
            .OnEntryFrom(declareUnfixableTrigger, NormalStep);
        
        var submitQuoteTrigger = machine.SetTriggerParameters<string?>(RepairTrigger.SubmitQuote);
        machine.Configure(RepairStatus.AwaitingApproval)
            .Permit(RepairTrigger.ApproveQuote, RepairStatus.AwaitingRepair)
            .PermitIf(RepairTrigger.RejectQuote, RepairStatus.DiagnosisFeeRequired, () => repairInstance.DiagnosisFee != null && repairInstance.DiagnosisFee.Value != 0)
            .PermitIf(RepairTrigger.RejectQuote, RepairStatus.AwaitingShipping, () => (repairInstance.DiagnosisFee == null || repairInstance.DiagnosisFee.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.CourierDelivery)
            .PermitIf(RepairTrigger.RejectQuote, RepairStatus.ReadyForPickup, () => (repairInstance.DiagnosisFee == null || repairInstance.DiagnosisFee.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.SelfPickup)
            .OnEntryFrom(submitQuoteTrigger, QuoteStep)
            .OnExit(transition =>
            {
                var accepted = transition.Trigger == RepairTrigger.ApproveQuote;
                var step = repairInstance.RepairHistory
                    .FirstOrDefault(rs => rs.Status == RepairStatus.AwaitingApproval);

                if (step is QuoteRepairStep quoteStep)
                {
                    quoteStep.Quote.QuoteAccepted = accepted;
                }
            });

        machine.Configure(RepairStatus.DiagnosisFeeRequired)
            .PermitIf(RepairTrigger.PaymentCompleted, RepairStatus.AwaitingShipping, () => repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.CourierDelivery)
            .PermitIf(RepairTrigger.PaymentCompleted, RepairStatus.ReadyForPickup, ()=> repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.SelfPickup)
            .OnEntry(() => DiagnosisFeeStep(null));
        
        var completeRepairSuccessTrigger = machine.SetTriggerParameters<string?>(RepairTrigger.CompleteRepairSuccess);
        machine.Configure(RepairStatus.FinalPaymentRequired)
            .PermitIf(RepairTrigger.PaymentCompleted, RepairStatus.AwaitingShipping, () => repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.CourierDelivery)
            .PermitIf(RepairTrigger.PaymentCompleted, RepairStatus.ReadyForPickup, ()=> repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.SelfPickup)
            .OnEntryFrom(completeRepairSuccessTrigger, FinalPaymentStep);

        machine.Configure(RepairStatus.AwaitingRepair)
            .Permit(RepairTrigger.StartRepair, RepairStatus.InRepair)
            .OnEntry(() => NormalStep(null));

        machine.Configure(RepairStatus.InRepair)
            .PermitIf(RepairTrigger.CompleteRepairSuccess, RepairStatus.FinalPaymentRequired, () => repairInstance.FinalCost != null && repairInstance.FinalCost.Value != 0)
            .PermitIf(RepairTrigger.CompleteRepairSuccess, RepairStatus.AwaitingShipping, () => (repairInstance.FinalCost == null || repairInstance.FinalCost.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.CourierDelivery)
            .PermitIf(RepairTrigger.CompleteRepairSuccess, RepairStatus.ReadyForPickup, () => (repairInstance.FinalCost == null || repairInstance.FinalCost.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.SelfPickup)
            .Permit(RepairTrigger.CompleteRepairFailure, RepairStatus.RepairFailed)
            .Permit(RepairTrigger.PartsNeeded, RepairStatus.AwaitingParts)
            .OnEntryFrom(RepairTrigger.StartRepair, () => NormalStep(null));

        var completeRepairFailureTrigger = machine.SetTriggerParameters<string?>(RepairTrigger.CompleteRepairFailure);
        machine.Configure(RepairStatus.RepairFailed)
            .PermitIf(RepairTrigger.FinalizeFailedRepair, RepairStatus.DiagnosisFeeRequired, () => repairInstance.DiagnosisFee != null && repairInstance.DiagnosisFee.Value != 0)
            .PermitIf(RepairTrigger.FinalizeFailedRepair, RepairStatus.AwaitingShipping, () => (repairInstance.DiagnosisFee == null || repairInstance.DiagnosisFee.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.CourierDelivery)
            .PermitIf(RepairTrigger.FinalizeFailedRepair, RepairStatus.ReadyForPickup, () => (repairInstance.DiagnosisFee == null || repairInstance.DiagnosisFee.Value == 0) && repairInstance.ReturnInfo.ReturnMethod == ReturnMethod.SelfPickup)
            .OnEntryFrom(completeRepairFailureTrigger, NormalStep);
        
        machine.Configure(RepairStatus.AwaitingParts)
            .Permit(RepairTrigger.PartsArrived, RepairStatus.InRepair);

        machine.Configure(RepairStatus.ReadyForPickup)
            .Permit(RepairTrigger.Pickup, RepairStatus.Completed)
            .OnEntryFrom(RepairTrigger.PaymentCompleted, () => NormalStep(null))
            .OnEntryFrom(RepairTrigger.RejectQuote, () => NormalStep(null))
            .OnEntryFrom(RepairTrigger.FinalizeUnfixable, () => NormalStep(null))
            .OnEntryFrom(RepairTrigger.FinalizeFailedRepair, () => NormalStep(null));
        
        machine.Configure(RepairStatus.AwaitingShipping)
            .Permit(RepairTrigger.Ship, RepairStatus.Shipped)
            .OnEntryFrom(RepairTrigger.PaymentCompleted, () => NormalStep(null))
            .OnEntryFrom(RepairTrigger.RejectQuote, () => NormalStep(null))
            .OnEntryFrom(RepairTrigger.FinalizeUnfixable, () => NormalStep(null))
            .OnEntryFrom(RepairTrigger.FinalizeFailedRepair, () => NormalStep(null));
        
        machine.Configure(RepairStatus.Shipped)
            .Permit(RepairTrigger.FinalizeDelivery, RepairStatus.Completed)
            .OnEntry(() => NormalStep(null));

        machine.Configure(RepairStatus.Completed)
            .Permit(RepairTrigger.ReportComplaint, RepairStatus.Complaint)
            .OnEntryFrom(RepairTrigger.Pickup, () => NormalStep(null))
            .OnEntryFrom(RepairTrigger.FinalizeDelivery, () => NormalStep(null));
        
        machine.Configure(RepairStatus.Complaint)
            .Permit(RepairTrigger.ResolveComplaint, RepairStatus.Completed);
        
        return machine;
    }
}