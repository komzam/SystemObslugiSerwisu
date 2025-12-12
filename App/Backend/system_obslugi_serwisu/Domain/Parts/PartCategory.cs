using system_obslugi_serwisu.Domain.Parts.Errors;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Domain.Parts;

public record PartCategoryId(Guid Value);
public class PartCategory
{
    public const int NameMaxLength = 200;
    
    public PartCategoryId Id { get; private set; }
    public string Name { get; private set; }
    
    private PartCategory() {}

    private PartCategory(string name)
    {
        Id = new PartCategoryId(Guid.NewGuid());
        Name = name;
    }

    private static OperationResult ValidateInput(string name)
    {
        if(String.IsNullOrWhiteSpace(name))
            return PartCategoryErrors.InvalidName();
        
        if(name.Length > NameMaxLength)
            return PartCategoryErrors.NameTooLong();

        return OperationResult.Success();
    }

    public static OperationResult<PartCategory> Create(string name)
    {
        name = name.Trim();
        var validateResult = ValidateInput(name);
        if(validateResult.IsFailure)
            return validateResult.Error;

        return new PartCategory(name);
    }

    public OperationResult ChangeName(string name)
    {
        var validateResult = ValidateInput(name);
        if(validateResult.IsFailure)
            return validateResult.Error;
        
        Name = name;
        return OperationResult.Success();
    }
}