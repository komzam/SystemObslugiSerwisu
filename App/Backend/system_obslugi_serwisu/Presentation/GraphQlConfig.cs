using system_obslugi_serwisu.Presentation.Conversations;
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
            .AddInMemorySubscriptions()
            .AddType<NormalRepairStepDto>()
            .AddType<PaymentRepairStepDto>()
            .AddType<QuoteRepairStepDto>()
            .AddQueryType<Query>()
                .AddTypeExtension<CustomerQueries>()
                .AddTypeExtension<CustomerExtensions>()
                .AddTypeExtension<RepairShopQueries>()
                .AddTypeExtension<RepairShopExtensions>()
                .AddTypeExtension<ReviewQueries>()
                .AddTypeExtension<ReviewExtensions>()
                .AddTypeExtension<ServiceQueries>()
                .AddTypeExtension<RepairQueries>()
                .AddTypeExtension<RepairExtensions>()
                .AddTypeExtension<ConversationQueries>()
                .AddTypeExtension<ConversationExtensions>()
            .AddMutationType<Mutation>()
                .AddTypeExtension<CustomerMutations>()
                .AddTypeExtension<ReviewMutations>()
                .AddTypeExtension<RepairMutations>()
                .AddTypeExtension<RepairShopMutations>()
                .AddTypeExtension<ConversationMutations>()
            .AddSubscriptionType<Subscription>()
                .AddTypeExtension<ConversationSubscriptions>();
    }
}