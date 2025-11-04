namespace system_obslugi_serwisu.Domain.Repairs.RepairStateMachine;

public enum RepairTrigger
{
    FinalizeBooking,
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