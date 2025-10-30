namespace system_obslugi_serwisu.Domain.Repairs.RepairStep;

public class RepairStep
{
    public const int DescriptionMaxLength = 200;
    
    public string Description { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
}