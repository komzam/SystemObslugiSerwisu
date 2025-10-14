namespace system_obslugi_serwisu.Presentation.RepairShops;

public class SearchByNameRequest
{
    public required string Name { get; set; }
    public required int PageSize { get; set; }
    public required int PageNumber { get; set; }
}