namespace system_obslugi_serwisu.Presentation.Parts.Dto;

public class PartNeededDto
{
    public required Guid RepairId { get; set; }
    public required Guid PartId { get; set; }
    public required int Quantity { get; set; }
}