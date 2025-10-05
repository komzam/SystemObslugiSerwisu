using system_obslugi_serwisu.Database;
using system_obslugi_serwisu.Dtos;

namespace system_obslugi_serwisu.Types;

public class Query
{
    public UserDto? Me(DatabaseContext context)
    {
        context
        UserDto user = new UserDto();
        user.Email = "AA";
        return user;
    }

    public UserDto? GetUser()
    {
        UserDto user = new UserDto();
        user.Email = "AA";
        return user;
    }
}