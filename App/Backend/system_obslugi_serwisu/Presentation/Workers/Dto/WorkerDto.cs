namespace system_obslugi_serwisu.Presentation.Workers.Dto;

public class WorkerDto
{
    public required Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; } 
    [GraphQLIgnore]
    public required Guid? AssignedRepairId { get; set; }
}