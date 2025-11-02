namespace system_obslugi_serwisu.Domain.Repairs.RepairStateMachine;

public enum RepairTrigger
{
    CheckIn,
    QueueForDiagnosis,
    StartDiagnosis,
    SubmitQuote,
    DeclareUnfixable,
    FinalizeUnfixable,
    ApproveQuote,
    RejectQuote,
    StartRepair,
    PartsNeeded,
    PartsArrived,
    CompleteRepairSuccess,
    CompleteRepairFailure,
    FinalizeFailedRepair,
    PaymentCompleted,
    Pickup,
    Ship,
    FinalizeDelivery,
    Cancel,
    ReportComplaint,
    ResolveComplaint
}