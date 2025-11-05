namespace system_obslugi_serwisu.Presentation.Repairs.Dto;

public class QuoteDto
{
    public required string LaborCost { get; set; }
    public required string PartsCost { get; set; }
    public required string TotalCost { get; set; }
    public bool? QuoteAccepted { get; set; }
}