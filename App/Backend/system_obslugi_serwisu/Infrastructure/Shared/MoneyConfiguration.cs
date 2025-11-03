using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using system_obslugi_serwisu.Domain.Shared;

namespace system_obslugi_serwisu.Infrastructure.Shared;
 
public static class MoneyConfiguration
{
    public static void OwnsMoney<TEntity>(
        this EntityTypeBuilder<TEntity> builder,
        Expression<Func<TEntity, Money?>> navigationExpression,
        string prefix)
        where TEntity : class
    {
        builder.OwnsOne(navigationExpression, money =>
        {
            money.Property(m => m.Value)
                .HasColumnName($"{prefix}_Value")
                .HasPrecision(18, 2);

            money.Property(m => m.Currency)
                .HasColumnName($"{prefix}_Currency")
                .HasConversion(
                    c => c.Code,
                    code => Currency.Create(code).Value);
        });
    }
}