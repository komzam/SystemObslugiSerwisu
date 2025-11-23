using System.Security.Claims;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using MediatR;
using system_obslugi_serwisu.Application.Customers.Get;
using system_obslugi_serwisu.Application.Shared;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Middleware;

namespace system_obslugi_serwisu.Presentation.Customers;

[ExtendObjectType(typeof(Query))]
public class CustomerQueries
{
}