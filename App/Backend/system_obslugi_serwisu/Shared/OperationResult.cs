namespace system_obslugi_serwisu.Shared;

public class OperationResult
{
    protected OperationResult(bool isSuccess, OperationError error)
    {
        if(isSuccess && error != OperationError.None() ||
           !isSuccess && error == OperationError.None())
        {
            throw new ArgumentException("Invalid Result");
        }
        
        IsSuccess = isSuccess;
        Error = error;
    }
    
    public bool IsSuccess { get; }
    
    public bool IsFailure => !IsSuccess;
    
    public OperationError Error { get; }
    
    public static OperationResult Success() => new(true, OperationError.None());
    
    public static OperationResult Failure(OperationError error) => new (false, error);
    
    public static implicit operator OperationResult(OperationError error) => Failure(error); 
}


public class OperationResult<T> : OperationResult
{
    protected OperationResult(bool isSuccess, OperationError error, T value) : base(isSuccess, error)
    {
        _value = value;
    }

    private readonly T _value;

    public T Value => IsSuccess ? _value : throw new InvalidOperationException("Cannot access Value on a failed result");

    public bool TryGetValue(out T value)
    {
        value = _value;
        return IsSuccess;
    }

    public static OperationResult<T> Success(T value) => new(true, OperationError.None(), value);
    
    public new static OperationResult<T> Failure(OperationError error) => new (false, error, default!);
    
    public static implicit operator OperationResult<T>(OperationError error) => Failure(error); 
    public static implicit operator OperationResult<T>(T value) => Success(value);
}