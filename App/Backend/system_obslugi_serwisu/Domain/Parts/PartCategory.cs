namespace system_obslugi_serwisu.Domain.Parts;

public record PartCategoryId(Guid Value);
public class PartCategory
{
    public PartCategoryId Id { get; private set; }
    public string Name { get; private set; }
    
}