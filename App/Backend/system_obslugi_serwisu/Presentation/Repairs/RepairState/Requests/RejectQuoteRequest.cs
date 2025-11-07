using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs.RepairState.Requests;

public class RejectQuoteRequest
{
    public required Guid RepairId { get; set; }
    public required ActingRole ActingRole { get; set; }
}