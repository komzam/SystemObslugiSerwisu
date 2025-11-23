namespace system_obslugi_serwisu.Presentation.Services.Get;

public class GetServicesRequest
{
    public required Guid RepairShopId { get; init; }
    public required int PageSize { get; set; }
    public required int PageNumber { get; set; }
}