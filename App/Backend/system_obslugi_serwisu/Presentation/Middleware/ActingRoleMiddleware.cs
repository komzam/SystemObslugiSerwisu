using System.Reflection;
using System.Runtime.CompilerServices;
using HotChocolate.Resolvers;
using HotChocolate.Types.Descriptors;
using Microsoft.Extensions.Primitives;
using system_obslugi_serwisu.Application.Shared;

namespace system_obslugi_serwisu.Presentation.Middleware;

public class ActingRoleMiddleware
{
    private readonly FieldDelegate _next;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ActingRoleMiddleware(FieldDelegate next, IHttpContextAccessor httpContextAccessor)
    {
        _next = next;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task InvokeAsync(IMiddlewareContext context)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            throw new GraphQLException("Cannot determine ActingRole because HttpContext is missing.");
        }

        if (!httpContext.Request.Headers.TryGetValue("X-ActingRole", out StringValues header))
        {
            throw new GraphQLException("X-ActingRole header is missing. ActingRole cannot be determined.");
        }

        var actingRoleValue = header.ToString().ToLowerInvariant();

        ActingRole actingRole = actingRoleValue switch
        {
            "worker" => ActingRole.Worker,
            "customer" => ActingRole.Customer,
            _ => throw new GraphQLException($"Invalid X-ActingRole value: '{actingRoleValue}'")
        };
        
        context.SetLocalState("actingRole", actingRole);

        await _next(context);
    }
}

public class ActingRoleMiddlewareAttribute : ObjectFieldDescriptorAttribute
{
    public ActingRoleMiddlewareAttribute([CallerLineNumber] int order = 0)
    {
        Order = order;
    }

    protected override void OnConfigure(IDescriptorContext context,
        IObjectFieldDescriptor descriptor, MemberInfo member)
    {
        descriptor.Use<ActingRoleMiddleware>();
    }
}