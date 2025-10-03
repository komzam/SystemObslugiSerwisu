using HotChocolate.Authorization;

namespace system_obslugi_serwisu.Dtos;

[Authorize]
public class UserDto
{
    public string Email { get; set; }
}