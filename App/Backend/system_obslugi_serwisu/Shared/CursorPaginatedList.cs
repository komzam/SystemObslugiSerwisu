namespace system_obslugi_serwisu.Shared;

public class CursorPaginatedList<T, TId>
{
    public required List<T> Items { get; set; }
    public TId? LastItemId { get; set; }
    
    public CursorPaginatedList<TResult, TId> Map<TResult>(Func<T, TResult> mapFunc)
    {
        return new CursorPaginatedList<TResult, TId>
        {
            Items = Items.Select(mapFunc).ToList(),
            LastItemId = LastItemId,
        };
    }
    
    public CursorPaginatedList<TResult, TIdResult> Map<TResult, TIdResult>(Func<T, TResult> mapFunc, Func<TId, TIdResult> mapFuncId)
    {
        return new CursorPaginatedList<TResult, TIdResult>
        {
            Items = Items.Select(mapFunc).ToList(),
            LastItemId = LastItemId!=null? mapFuncId(LastItemId): default,
        };
    }
}