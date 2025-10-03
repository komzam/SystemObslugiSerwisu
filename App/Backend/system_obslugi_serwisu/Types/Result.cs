namespace system_obslugi_serwisu.Types;

public class Result
{
    protected Result(bool isSuccess, Error error)
    {
        if(isSuccess && error != Error.None() ||
           !isSuccess && error == Error.None())
        {
            throw new ArgumentException("Invalid Result");
        }
        
        IsSuccess = isSuccess;
        Error = error;
    }
    
    public bool IsSuccess { get; }
    
    public bool IsFailure => !IsSuccess;
    
    public Error Error { get; }
    
    public static Result Success() => new(true, Error.None());
    
    public static Result Failure(Error error) => new (false, error);
}


public class Result<T> : Result
{
    protected Result(bool isSuccess, Error error, T value) : base(isSuccess, error)
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

    public static Result<T> Success(T value) => new(true, Error.None(), value);
    
    public new static Result<T> Failure(Error error) => new (false, error, default!);
}