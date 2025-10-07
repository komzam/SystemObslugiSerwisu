namespace system_obslugi_serwisu.Domain.Repairs;

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