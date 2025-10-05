namespace system_obslugi_serwisu.Types;

public enum RepairStatus
{
    Booked,
    ToBeDiagnosed,
    AwaitingConfirmation,
    Canceled,
    ReadyToRepair,
    InRepair,
    AwaitingParts,
    PaymentRequired,
    ToBeSentOut,
    ReadyForPickup,
    SentOut,
    Completed,
    Complaint
}