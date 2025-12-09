using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using HotChocolate.Resolvers;
using HotChocolate.Types.Descriptors;
using MediatR;
using Microsoft.Extensions.Primitives;
using system_obslugi_serwisu.Application.Database.SetTenant;
using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.Middleware;

public class SetTenantMiddleware
{
    private readonly FieldDelegate _next;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SetTenantMiddleware(FieldDelegate next, IHttpContextAccessor httpContextAccessor)
    {
        _next = next;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task InvokeAsync(IMiddlewareContext context)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            throw new GraphQLException("Cannot determine Tenant because HttpContext is missing.");
        }

        var claimsPrincipal = httpContext.User;
        
        var userIdString = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid user id")
                .SetCode("BadGuid")
                .Build());
        
        var mediatr = context.Services.GetRequiredService<IMediator>();
        var setTenantResult = await mediatr.Send(new SetTenantCommand{WorkerId = userId});
        if(setTenantResult.IsFailure)
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(setTenantResult.Error.GetUserMessage())
                .SetCode(setTenantResult.Error.GetUserCode())
                .Build());
        
        await _next(context);
    }
}

public class SetTenantMiddlewareAttribute : ObjectFieldDescriptorAttribute
{
    public SetTenantMiddlewareAttribute([CallerLineNumber] int order = 0)
    {
        Order = order;
    }

    protected override void OnConfigure(IDescriptorContext context,
        IObjectFieldDescriptor descriptor, MemberInfo member)
    {
        descriptor.Use<SetTenantMiddleware>();
    }
}