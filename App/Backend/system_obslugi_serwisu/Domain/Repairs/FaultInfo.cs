using system_obslugi_serwisu.Domain.Repairs.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Repairs;

public class FaultInfo : ValueObject
{
    public const int WhenOccuredMaxLength = 200;
    public const int HowToReproduceMaxLength = 1000;
    public const int DescriptionMaxLength = 1000;
    
    public string WhenOccured { get; private set; }
    public string HowToReproduce { get; private set; }
    public string Description { get; private set; }
    public bool PreviouslyRepaired { get; private set; }
    
    private FaultInfo(){}

    private FaultInfo(string whenOccured, string howToReproduce, string description, bool previouslyRepaired)
    {
        WhenOccured = whenOccured;
        HowToReproduce = howToReproduce;
        Description = description;
        PreviouslyRepaired = previouslyRepaired;
    }
    
    private static OperationResult ValidateInput(string whenOccured, string howToReproduce,
        string description)
    {
        if (string.IsNullOrWhiteSpace(whenOccured))
            return FaultInfoErrors.InvalidWhenOccured();
        
        if (whenOccured.Length > WhenOccuredMaxLength)
            return FaultInfoErrors.WhenOccuredTooLong();
        
        if (string.IsNullOrWhiteSpace(howToReproduce))
            return FaultInfoErrors.InvalidHowToReproduce();
        
        if (howToReproduce.Length > HowToReproduceMaxLength)
            return FaultInfoErrors.HowToReproduceTooLong();
        
        if (string.IsNullOrWhiteSpace(description))
            return FaultInfoErrors.InvalidDescription();
        
        if (description.Length > DescriptionMaxLength)
            return FaultInfoErrors.DescriptionTooLong();
        
        return OperationResult.Success();
    }

    public static OperationResult<FaultInfo> Create(string whenOccured, string howToReproduce, string description,
        bool previouslyRepaired)
    {
        whenOccured = whenOccured.Trim();
        howToReproduce = howToReproduce.Trim();
        description = description.Trim();
        
        var validationResult = ValidateInput(whenOccured, howToReproduce, description);
        if (validationResult.IsFailure)
            return validationResult.Error;
        
        return new FaultInfo(whenOccured, howToReproduce, description, previouslyRepaired);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return WhenOccured;
        yield return HowToReproduce;
        yield return Description;
        yield return PreviouslyRepaired;
    }
}