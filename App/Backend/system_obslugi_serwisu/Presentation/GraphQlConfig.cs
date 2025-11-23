using system_obslugi_serwisu.Presentation.Auth;
using system_obslugi_serwisu.Presentation.Conversations;
using system_obslugi_serwisu.Presentation.Customers;
using system_obslugi_serwisu.Presentation.Customers.Dto;
using system_obslugi_serwisu.Presentation.Repairs;
using system_obslugi_serwisu.Presentation.Repairs.Dto.RepairSteps;
using system_obslugi_serwisu.Presentation.RepairShops;
using system_obslugi_serwisu.Presentation.Reviews;
using system_obslugi_serwisu.Presentation.Services;
using system_obslugi_serwisu.Presentation.Workers.Dto;

namespace system_obslugi_serwisu.Presentation;

public class GraphQlConfig
{
    public static void Apply(WebApplicationBuilder builder)
    {
        builder.Services.AddDataLoader<RepairShopBatchDataLoader>();
        builder.Services.AddDataLoader<RepairBatchDataLoader>();
        builder.Services.AddDataLoader<CustomerBatchDataLoader>();
        builder.Services.AddDataLoader<AuthorBatchDataLoader>();
        
        builder.Services.AddGraphQLServer()
            .AddAuthorization()
            .AddInMemorySubscriptions()
            .AddType<NormalRepairStepDto>()
            .AddType<PaymentRepairStepDto>()
            .AddType<QuoteRepairStepDto>()
            .AddType<FullCustomerDto>()
            .AddType<FullWorkerDto>()
            .AddQueryType<Query>()
                .AddTypeExtension<AuthQueries>()
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