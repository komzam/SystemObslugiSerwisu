namespace system_obslugi_serwisu.Domain.Shared;

public class ImageDto
{
    public required ImageId Id { get; set; }
    public required string Small { get; set; }
    public required string Medium { get; set; }
    public required string Large { get; set; }
    public required string ExtraLarge { get; set; }
}