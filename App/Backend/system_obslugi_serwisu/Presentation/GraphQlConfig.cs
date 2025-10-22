using system_obslugi_serwisu.Presentation.Customers;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.Reviews;
using system_obslugi_serwisu.Presentation.Services;

namespace system_obslugi_serwisu.Presentation;

public class GraphQlConfig
{
    public static void Apply(WebApplicationBuilder builder)
    {
        builder.Services.AddGraphQLServer()
            .AddAuthorization()
            .AddQueryType<Query>()
                .AddTypeExtension<CustomerQueries>()
                .AddTypeExtension<RepairShopQueries>()
                .AddTypeExtension<ReviewQueries>()
                .AddTypeExtension<ServiceQueries>()
                .AddTypeExtension<RepairQueries>()
            .AddMutationType<Mutation>()
                .AddTypeExtension<CustomerMutations>()
                .AddTypeExtension<ReviewMutations>()
                .AddTypeExtension<RepairMutations>();
    }
}