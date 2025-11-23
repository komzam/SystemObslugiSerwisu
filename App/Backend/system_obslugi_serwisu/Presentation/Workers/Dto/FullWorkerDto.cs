using system_obslugi_serwisu.Presentation.Auth.Dto;

namespace system_obslugi_serwisu.Presentation.Workers.Dto;

public class FullWorkerDto : IMeResult
{
    public required Guid Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; } 
}