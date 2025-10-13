namespace system_obslugi_serwisu.Shared;

public class PaginatedList<T>
{
    public required List<T> Items { get; set; }
    public required int PageNumber { get; set; }
    public required int PageSize { get; set; }
    public required int TotalCount { get; set; }
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    
    public PaginatedList<TResult> Map<TResult>(Func<T, TResult> mapFunc)
    {
        return new PaginatedList<TResult>
        {
            Items = Items.Select(mapFunc).ToList(),
            PageNumber = PageNumber,
            PageSize = PageSize,
            TotalCount = TotalCount
        };
    }
}