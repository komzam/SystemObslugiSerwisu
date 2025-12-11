namespace system_obslugi_serwisu.Presentation.Parts.Add;

public class AddPartRequest
{
    public required string Name { get; set; }
    public required string ManufacturerCode { get; set; }
    public required Guid PartCategoryId { get; set; }
    public required int InitialStock { get; set; }
    public required int LowStockThreshold { get; set; }
}