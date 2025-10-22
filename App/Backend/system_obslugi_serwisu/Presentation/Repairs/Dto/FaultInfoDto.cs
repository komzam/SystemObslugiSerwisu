namespace system_obslugi_serwisu.Presentation.Repairs.Dto;

public class FaultInfoDto
{
    public required string WhenOccured { get; set; }
    public required string HowToReproduce { get; set; }
    public required string Description { get; set; }
    public required bool PreviouslyRepaired { get; set; }
}