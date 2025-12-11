using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Presentation.Parts.Dto;

public class PartReservationDto
{
    public required Guid Id { get; set; }
    public required Guid PartId { get; set; }
    public required Guid RepairId { get; set; }
    public required int QuantityReserved { get; set; }
    public required int QuantityRequested { get; set; }
    public required ReservationStatus Status { get; set; }
}