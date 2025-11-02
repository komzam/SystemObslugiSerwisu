namespace system_obslugi_serwisu.Domain.Repairs;

public enum RepairStatus
{
    AwaitingDelivery,
    Received,
    
    AwaitingDiagnosis,
    Diagnosing,
    Unfixable,
    AwaitingApproval,
    
    DiagnosisFeeRequired,
    FinalPaymentRequired,
    
    AwaitingRepair,
    InRepair,
    RepairFailed,
    AwaitingParts,
    
    ReadyForPickup,
    AwaitingShipping,
    Shipped,
    
    Completed,
    Canceled,
    Complaint
}