using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Presentation.Parts.Dto;

public class PartDto
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string ManufacturerCode { get; set; }
    public required bool NeedsReorder { get; set; }
    [GraphQLIgnore]
    public required Guid CategoryId { get; set; }
    public required decimal Price { get; set; }
    public required int Stock { get; set; }
    public required int Reserved { get; set; }
    public required int Available { get; set; }
    public StockLevel StockLevel { get; set; }
    public required int LowStockThreshold { get; set; }
}