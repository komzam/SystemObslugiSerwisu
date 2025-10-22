using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs.Errors;

public static class FaultInfoErrors
{
    private static readonly string Prefix = "FaultInfo";
    
    public static OperationError WhenOccuredTooLong(string message = "The when occured is too long") => 
        new ($"{Prefix}.WhenOccuredTooLong", message);
    
    public static OperationError InvalidWhenOccured(string message = "Invalid when occured") => 
        new ($"{Prefix}.InvalidWhenOccured", message);
    
    public static OperationError HowToReproduceTooLong(string message = "The how to reproduce is too long") => 
        new ($"{Prefix}.HowToReproduceTooLong", message);
    
    public static OperationError InvalidHowToReproduce(string message = "Invalid how to reproduce") => 
        new ($"{Prefix}.InvalidHowToReproduce", message);
    
    public static OperationError DescriptionTooLong(string message = "The description is too long") => 
        new ($"{Prefix}.DescriptionTooLong", message);
    
    public static OperationError InvalidDescription(string message = "Invalid description") => 
        new ($"{Prefix}.InvalidDescription", message);
}