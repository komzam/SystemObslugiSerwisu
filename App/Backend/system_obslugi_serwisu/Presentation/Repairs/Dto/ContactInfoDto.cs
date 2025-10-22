using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs.Dto;

public class ContactInfoDto
{
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public ContactMethod PreferredContactMethod { get; set; }
}