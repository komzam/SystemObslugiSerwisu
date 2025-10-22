using system_obslugi_serwisu.Domain.Shared;
using system_obslugi_serwisu.Presentation.Shared;

namespace system_obslugi_serwisu.Presentation.Repairs.Dto;

public class ReturnInfoDto
{
    public ReturnMethod ReturnMethod { get; set; }
    public AddressDto? ReturnAddress { get; set; }
}