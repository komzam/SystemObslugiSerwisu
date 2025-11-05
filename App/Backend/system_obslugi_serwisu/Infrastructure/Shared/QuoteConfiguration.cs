using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Repairs;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.Shared;

public static class QuoteConfiguration
{
    public static void OwnsQuote<TEntity>(
        this EntityTypeBuilder<TEntity> builder,
        Expression<Func<TEntity, Quote?>> navigationExpression)
        where TEntity : class
    {
        builder.OwnsOne(navigationExpression, quote =>
        {
            quote.OwnsMoney(q => q.LaborCost, "LaborCost");
            quote.OwnsMoney(q => q.PartsCost, "PartsCost");
            quote.Property(q => q.QuoteAccepted);
            quote.Property(q => q.CreatedAt);
        });
    }
}