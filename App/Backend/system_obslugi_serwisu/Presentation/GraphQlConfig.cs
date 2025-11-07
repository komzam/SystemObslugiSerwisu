using system_obslugi_serwisu.Presentation.Customers;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto.RepairSteps;
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
            .AddType<NormalRepairStepDto>()
            .AddType<PaymentRepairStepDto>()
            .AddType<QuoteRepairStepDto>()
            .AddQueryType<Query>()
                .AddTypeExtension<CustomerQueries>()
                .AddTypeExtension<CustomerExtensions>()
                .AddTypeExtension<RepairShopQueries>()
                .AddTypeExtension<ReviewQueries>()
                .AddTypeExtension<ReviewExtensions>()
                .AddTypeExtension<ServiceQueries>()
                .AddTypeExtension<RepairQueries>()
                .AddTypeExtension<RepairExtensions>()
            .AddMutationType<Mutation>()
                .AddTypeExtension<CustomerMutations>()
                .AddTypeExtension<ReviewMutations>()
                .AddTypeExtension<RepairMutations>();
    }
}