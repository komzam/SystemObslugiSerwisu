namespace system_obslugi_serwisu.Domain.Shared;

public record ImageId(Guid Value);

public class Image
{
    public required ImageId Id { get; set; }
}