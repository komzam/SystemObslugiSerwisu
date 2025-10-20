using system_obslugi_serwisu.Domain.Services;
using system_obslugi_serwisu.Presentation.Services.Dto;

namespace system_obslugi_serwisu.Presentation.Services;

public static class ServiceMapper
{
    public static ServiceDto ToDto(Service service)
    {
        return new ServiceDto
        {
            Id = service.Id.ToString(),
            Name = service.Name,
            Price = service.Price.FormattedValue
        };
    }
}