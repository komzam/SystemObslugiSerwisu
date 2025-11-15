namespace system_obslugi_serwisu.Presentation.Customers.Dto;

public class CustomerDto
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public bool IsBusiness { get; set; }
}