using system_obslugi_serwisu.Database;
using system_obslugi_serwisu.Dtos;

namespace system_obslugi_serwisu.Types;

public class Query
{
    public UserDto? GetUser()
    {
        UserDto user = new UserDto();
        user.Email = "AA";
        return user;
    }

    /*public User? GetUser(DatabaseContext databaseContext)
    {
        try
        {
            var users = databaseContext.Users.ToList();
            return users.FirstOrDefault();
        }
        catch (Exception e)
        {
            return User.Create(e.GetType().ToString(), e.Message).Value;
        }
    }*/
}