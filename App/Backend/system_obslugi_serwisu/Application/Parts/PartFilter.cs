using system_obslugi_serwisu.Domain.Parts;

namespace system_obslugi_serwisu.Application.Parts;

public class PartFilter
{
    public List<StockLevel>? StockLevels { get; set; }
    public List<Guid>? Categories { get; set; }
    public bool? NeedsReorder { get; set; }
    
    public string? SearchTerm { get; set; }
}