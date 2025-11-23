using Microsoft.AspNetCore.Identity;
using system_obslugi_serwisu.Application.Identity;
using system_obslugi_serwisu.Shared;

namespace system_obslugi_serwisu.Infrastructure.Identity;

public static class IdentityErrorMapper
{
    private static readonly Dictionary<string, Func<OperationError>> ErrorDict = new()
    {
        {"DuplicateEmail", () => IdentityErrors.EmailExists()},
        {"DuplicateUserName", () => IdentityErrors.EmailExists()},
        {"InvalidEmail", () => IdentityErrors.InvalidEmail()},
        {"InvalidUserName", () => IdentityErrors.InvalidEmail()},
        {"PasswordMismatch", () => IdentityErrors.InvalidCredentials()},
        {"PasswordRequireDigit", () => IdentityErrors.InvalidPassword()},
        {"PasswordRequireLower", () => IdentityErrors.InvalidPassword()},
        {"PasswordRequireNonLetterOrDigit", () => IdentityErrors.InvalidPassword()},
        {"PasswordRequireUpper", () => IdentityErrors.InvalidPassword()},
        {"PasswordTooShort", () => IdentityErrors.InvalidPassword()}
    };

    public static OperationError Map(IdentityError error)
    {
        if (ErrorDict.TryGetValue(error.Code, out var errorFunc))
        {
            return errorFunc();
        }
        
        return IdentityErrors.UnknownError();
    }
}