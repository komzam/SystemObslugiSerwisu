using system_obslugi_serwisu.Domain.Actors;

namespace system_obslugi_serwisu.Domain.Users;

public record UserId(Guid Value);

public abstract class User : IActor
{
}