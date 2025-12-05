using system_obslugi_serwisu.Application.Repairs;
using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.RepairShops.GetRepairList;

public class GetRepairShopsRepairListRequest
{
    public RepairSortField? SortBy  { get; set; }
    public SortDirection? SortDirection { get; set; }
    public required RepairFilter Filter { get; set; }
    public required int PageSize { get; set; }
    public required int PageNumber { get; set; }
}